'use babel';

import { install } from 'atom-package-deps';
import { execSync } from 'child_process';

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
      try {
        stdout = execSync('wt --version');
        if (atom.inDevMode()) atom.notifications.addInfo(`**${meta.name}**`, { detail: stdout, dismissable: false });
        return true;
      } catch (error) {
        if (atom.inDevMode()) atom.notifications.addError(notEligible, { detail: error, dismissable: true });
        return false;
      }
    }

    settings() {
      const errorMatch = [
        '\\d{4}/\\d{2}/\\d{2} \\d{2}:\\d{2}:\\d{2} Error \\> (?<file>([^:]+)):(?<line>\\d+)\\n(?<message>.*)'
      ];

      return [
        {
          name: 'Wellington',
          exec: 'wt',
          args: [ 'compile', '{FILE_ACTIVE}', '--comment=false', '--build', '{FILE_ACTIVE_PATH}' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'wellington:compile',
          errorMatch: errorMatch
        },
        {
          name: 'Wellington (compact)',
          exec: 'wt',
          args: [ 'compile', '{FILE_ACTIVE}', '--comment=false', '--style=compact', '--build', '{FILE_ACTIVE_PATH}' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'wellington:compile-compact',
          errorMatch: errorMatch
        },
        {
          name: 'Wellington (compressed)',
          exec: 'wt',
          args: [ 'compile', '{FILE_ACTIVE}', '--comment=false', '--style=compressed', '--build', '{FILE_ACTIVE_PATH}' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'wellington:compile-compressed',
          errorMatch: errorMatch
        },
        {
          name: 'Wellington (expanded)',
          exec: 'wt',
          args: [ 'compile', '{FILE_ACTIVE}', '--comment=false', '--style=expanded', '--build', '{FILE_ACTIVE_PATH}' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'wellington:compile-expanded',
          errorMatch: errorMatch
        },
        {
          name: 'Watch Wellington',
          exec: 'wt',
          args: [ 'compile', '{FILE_ACTIVE}', '--comment=false', '--watch=true', '--build', '{FILE_ACTIVE_PATH}' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'wellington:watch-and-compile',
          errorMatch: errorMatch
        },
        {
          name: 'Watch Wellington (compact)',
          exec: 'wt',
          args: [ 'compile', '{FILE_ACTIVE}', '--comment=false', '--watch=true', '--style=compact', '--build', '{FILE_ACTIVE_PATH}' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'wellington:watch-and-compile-compact',
          errorMatch: errorMatch
        },
        {
          name: 'Watch Wellington (compressed)',
          exec: 'wt',
          args: [ 'compile', '{FILE_ACTIVE}', '--comment=false', '--watch=true', '--style=compressed', '--build', '{FILE_ACTIVE_PATH}' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'wellington:watch-and-compile-compressed',
          errorMatch: errorMatch
        },
        {
          name: 'Watch Wellington (expanded)',
          exec: 'wt',
          args: [ 'compile', '{FILE_ACTIVE}', '--comment=false', '--watch=true', '--style=expanded', '--build', '{FILE_ACTIVE_PATH}' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'wellington:watch-and-compile-expanded',
          errorMatch: errorMatch
        }
      ];
    }
  };
}
