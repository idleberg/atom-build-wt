'use babel';

import { install } from 'atom-package-deps';
import { exec } from 'child_process';

// Package settings
import meta from '../package.json';
const notEligible = `**${meta.name}**: \`wt\` is not in your PATH`;

// This package depends on build, make sure it's installed
export function activate() {
  if (!atom.inSpecMode()) {
    install(meta.name);
  }
}

export function provideBuilder() {
  return class WellingtonProvider {
    constructor(cwd) {
      this.cwd = cwd;
    }

    getNiceName() {
      return 'Wellington';
    }

    isEligible() {
      exec('wt --version', function (error, stdout, stderr) {
        if (error !== null) {
          // No wt installed
          if (atom.inDevMode()) atom.notifications.addError(notEligible, { detail: error, dismissable: true });
          return false;
        }
        if (atom.inDevMode()) atom.notifications.addInfo(`**${meta.name}**`, { detail: stdout, dismissable: false });
      });
      // Let's go!
      return true;
    }

    settings() {
      const errorMatch = [
        '\\d{4}/\\d{2}/\\d{2} \\d{2}:\\d{2}:\\d{2} Error \\> (?<file>([^:]+)):(?<line>\\d+)\\n(?<message>.*)'
      ];

      const comments = atom.config.get('build-wt.comments') || false;

      return [
        {
          name: 'Wellington',
          exec: 'wt',
          args: [ 'compile', '{FILE_ACTIVE}', '--comment=' + comments, '--build', '{FILE_ACTIVE_PATH}' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'wellington:compile',
          errorMatch: errorMatch
        },
        {
          name: 'Wellington (compact)',
          exec: 'wt',
          args: [ 'compile', '{FILE_ACTIVE}', '--comment=' + comments, '--style=compact', '--build', '{FILE_ACTIVE_PATH}' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'wellington:compile-compact',
          errorMatch: errorMatch
        },
        {
          name: 'Wellington (compressed)',
          exec: 'wt',
          args: [ 'compile', '{FILE_ACTIVE}', '--comment=' + comments, '--style=compressed', '--build', '{FILE_ACTIVE_PATH}' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'wellington:compile-compressed',
          errorMatch: errorMatch
        },
        {
          name: 'Wellington (expanded)',
          exec: 'wt',
          args: [ 'compile', '{FILE_ACTIVE}', '--comment=' + comments, '--style=expanded', '--build', '{FILE_ACTIVE_PATH}' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'wellington:compile-expanded',
          errorMatch: errorMatch
        }
      ];
    }
  };
}
