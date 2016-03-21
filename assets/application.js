(function() {

  'use strict';

  var TOKEN_ID = '8GuyzaxJLyisSn4oMYLs';
  var EXTERNAL_UID = '1';
  var QUALIFICATIONS_API_ENDPOINT = '';

  angular
    .module('opt.qualifications.survey', ['ngResource'])
    .constant('TOKEN_ID', TOKEN_ID)
    .constant('EXTERNAL_UID', EXTERNAL_UID)
    .run(run)
    .factory('qualification', qualification)
    .controller('SurveyCtrl', SurveyCtrl);

  function run($rootElement) {
    $rootElement[0].removeAttribute('style');
  }

  function qualification(TOKEN_ID, EXTERNAL_UID, $resource) {
    var Qualification = $resource(QUALIFICATIONS_API_ENDPOINT,
      {token_id: TOKEN_ID},
      {save: {method: 'POST', transformRequest: transformRequest}});

    return new Qualification({user: {}, survey: {}});

    function transformRequest(data) {
      return angular.toJson({
        user: transformUser(data.user),
        survey: data.survey
      });
    }

    function transformUser(user) {
      return {
        id: EXTERNAL_UID,
        birthday: [
          user['birthday(1i)'],
          user['birthday(2i)'],
          user['birthday(3i)']
        ].join('-'),
        region_id: user.region_id
      };
    }
  }

  function SurveyCtrl(qualification) {
    this.STATES = {
      BIRTHDATE: 0,
      STATE: 1,
      PREGNANT_OR_NURSING: 2,
      CHRONIC_HEALTH: 3,
      DISCOMFORT: 4,
      RECENT_EYE_SURGERY: 5
    };
    this.LAST_STATE = this.STATES.RECENT_EYE_SURGERY;
    this.state = this.STATES.BIRTHDATE;
    this.qualification = qualification;
  };

  SurveyCtrl.prototype.nextState = function nextState() {
    if (this.state < this.LAST_STATE) {
      this.state++;
    }
  };

  SurveyCtrl.prototype.submit = function submit() {
    var self = this;

    self._emitEvent('OPT_QUALIFICATION_SUBMITTED');

    self.qualification.$save(function(resp) {
      if (resp.qualifies) {
        self._emitEvent('OPT_QUALIFICATION_QUALIFIED', resp);
      } else {
        self._emitEvent('OPT_QUALIFICATION_DISQUALIFIED', resp);
      }
    });
  };

  /**
   * Emits a message to the document referrer (or the parent window).
   * @param {string} eventType
   * @param {Object} [data={}]
   */
  SurveyCtrl.prototype._emitEvent = function(eventType, data) {
    var message = angular.extend({}, {eventType: eventType}, data);
    return window.parent.postMessage(message, document.referrer);
  };

})();
