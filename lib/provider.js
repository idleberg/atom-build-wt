'use babel';

import { EventEmitter } from 'events';
import { install } from 'atom-package-deps';
import { spawnSync } from 'child_process';

// Package settings
import meta from '../package.json';

this.config = {
  customArguments: {
    title: "Custom Arguments",
    description: "Specify your preferred arguments for `wt`, supports [replacement](https://github.com/noseglid/atom-build#replacement) placeholders",
    type: "string",
    "default": "compile {FILE_ACTIVE} --comment=false --build {FILE_ACTIVE_PATH}",
    order: 0
  }
};

// This package depends on build, make sure it's installed
export function activate() {
  if (!atom.inSpecMode()) {
    install(meta.name);
  }
}

export function provideBuilder() {
  return class WellingtonProvider extends EventEmitter {
    constructor(cwd) {
      super();
      this.cwd = cwd;
      atom.config.observe('build-wt.customArguments', () => this.emit('refresh'));
    }

    getNiceName() {
      return 'Wellington';
    }

    isEligible() {
      try {
        spawnSync('wt --version');
      } catch (error) {
        if (atom.inDevMode()) atom.notifications.addError(meta.name, { detail: error, dismissable: true });
        return false;
      }

      return true;
    }

    settings() {
      const errorMatch = [
        '\\d{4}/\\d{2}/\\d{2} \\d{2}:\\d{2}:\\d{2} Error \\> (?<file>([^:]+)):(?<line>\\d+)\\n(?<message>.*)'
      ];

      // User settings
      const customArguments = atom.config.get('build-wt.customArguments').trim().split(" ");

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
          name: 'Wellington (user)',
          exec: 'wt',
          args: customArguments,
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          atomCommandName: 'wellington:compile-with-user-settings',
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
