import { DEBUG } from '@glimmer/env';
import { deprecate } from '@ember/debug';

export default function deprecateSubclassing(target) {
  if (DEBUG) {
    const originalInit = target.prototype.init;

    if (originalInit) {
      target.prototype.init = function () {
        deprecate(
          `Extending from ember-bootstrap component classes is not supported, and might break anytime. Detected subclassing of <Bs${target.name}> component.`,
          target === this.constructor || this['__ember-bootstrap_subclass'] === true,
          {
            id: `ember-bootstrap.subclassing#${target.name}`,
            until: '5.0.0',
          }
        );

        return originalInit.apply(this, arguments);
      };
    }
  }
}
