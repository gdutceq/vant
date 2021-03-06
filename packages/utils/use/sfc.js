/**
 * Create a basic component with common options
 */
import '../../locale';
import { camelize } from '..';

const arrayProp = {
  type: Array,
  default: () => []
};

const numberProp = {
  type: Number,
  default: 0
};

function defaultProps(props) {
  Object.keys(props).forEach(key => {
    if (props[key] === Array) {
      props[key] = arrayProp;
    } else if (props[key] === Number) {
      props[key] = numberProp;
    }
  });
}

function install(Vue) {
  const { name } = this;
  Vue.component(name, this);
  Vue.component(camelize(`-${name}`), this);
}

function functional(sfc) {
  const { render } = sfc;
  sfc.functional = true;
  sfc.render = (h, context) =>
    render(h, context, {
      style: context.data.style,
      class: context.data.class,
      staticClass: context.data.staticClass
    });
}

export default name => (sfc, isFunctional) => {
  sfc.name = name;
  sfc.install = install;

  if (sfc.props) {
    defaultProps(sfc.props);
  }

  if (isFunctional) {
    functional(sfc);
  }

  return sfc;
};
