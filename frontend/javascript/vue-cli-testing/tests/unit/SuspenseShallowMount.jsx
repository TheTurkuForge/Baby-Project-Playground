import {defineComponent, h, Suspense} from 'vue';
import {mount} from '@vue/test-utils';

export const FALLBACK_TEXT = 'Loading...';
export default function suspenseShallowMount(component, mountArgs) {
    const SuspenseWrapper = defineComponent({
        render() {
            return (
                <Suspense v-slots={{
                    default: () => h(component, mountArgs?.props),
                    fallback: () => h('span', FALLBACK_TEXT)
                }}/>
            );
        }
    });

    const stubs = Object.keys(component?.components ?? {});
    return mount(SuspenseWrapper, {
        global: {
            stubs
        }
    });
}
