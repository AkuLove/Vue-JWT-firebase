declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const component: ComponentOptions;
  export default component;
}

declare module 'vuex' {
  export * from 'vuex/types/index.d.ts';
  export * from 'vuex/types/helpers.d.ts';
  export * from 'vuex/types/logger.d.ts';
  export * from 'vuex/types/vue.d.ts';
}
