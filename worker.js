self.importScripts('context.js');

const state = () => chrome.storage.local.get({
  'enabled': true,
  'csp-1': true,
  'csp-2': true,
  'csp-3': true,
  'csp-4': true
}, prefs => {
  const options = {
    enableRulesetIds: [],
    disableRulesetIds: []
  };

  if (prefs.enabled) {
    options[prefs['csp-1'] ? 'enableRulesetIds' : 'disableRulesetIds'].push('csp-1');
    options[prefs['csp-2'] ? 'enableRulesetIds' : 'disableRulesetIds'].push('csp-2');
    options[prefs['csp-3'] ? 'enableRulesetIds' : 'disableRulesetIds'].push('csp-3');
    options[prefs['csp-4'] ? 'enableRulesetIds' : 'disableRulesetIds'].push('csp-4');
  } else {
    options.disableRulesetIds = ['csp-1', 'csp-2', 'csp-3', 'csp-4'];
  }

  chrome.declarativeNetRequest.updateEnabledRulesets(options);
});

state();

chrome.storage.onChanged.addListener(ps => {
  if (ps.enabled || ps['csp-1'] || ps['csp-2'] || ps['csp-3'] || ps['csp-4']) {
    state();
  }
});
