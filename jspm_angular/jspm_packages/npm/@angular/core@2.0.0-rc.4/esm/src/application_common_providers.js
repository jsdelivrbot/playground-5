/* */ 
"format cjs";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { APPLICATION_CORE_PROVIDERS } from './application_ref';
import { APP_ID_RANDOM_PROVIDER } from './application_tokens';
import { IterableDiffers, KeyValueDiffers, defaultIterableDiffers, defaultKeyValueDiffers } from './change_detection/change_detection';
import { ComponentFactoryResolver } from './linker/component_factory_resolver';
import { ComponentResolver, ReflectorComponentResolver } from './linker/component_resolver';
import { DynamicComponentLoader, DynamicComponentLoader_ } from './linker/dynamic_component_loader';
import { ViewUtils } from './linker/view_utils';
let __unused; // avoid unused import when Type union types are erased
/**
 * A default set of providers which should be included in any Angular
 * application, regardless of the platform it runs onto.
 * @stable
 */
export const APPLICATION_COMMON_PROVIDERS = 
/*@ts2dart_const*/ [
    APPLICATION_CORE_PROVIDERS,
    /* @ts2dart_Provider */ { provide: ComponentResolver, useClass: ReflectorComponentResolver },
    { provide: ComponentFactoryResolver, useValue: ComponentFactoryResolver.NULL },
    APP_ID_RANDOM_PROVIDER,
    ViewUtils,
    /* @ts2dart_Provider */ { provide: IterableDiffers, useValue: defaultIterableDiffers },
    /* @ts2dart_Provider */ { provide: KeyValueDiffers, useValue: defaultKeyValueDiffers },
    /* @ts2dart_Provider */ { provide: DynamicComponentLoader, useClass: DynamicComponentLoader_ },
];
//# sourceMappingURL=application_common_providers.js.map