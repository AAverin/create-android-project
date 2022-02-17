# TODO:

## Main Project => app

- Clean signingconfig using gradle.properties
- modularisation + base gradle file
  core, coreui, date, (network, storage), testing, uitesting
- multidex setup
- all.properties + properties.loader

### CI => app || dynamic

+ github actions 
- travis
- bitrise
- fastlane

#### DI => app

- Koin
- Dagger

### Libraries

- ktlint => app || dynamic

#### UI => uicore (api)

- Jetpack compose
- Google Architecture components

#### Images => uicore (api)

- Picasso
- Glide

#### Network => network || dynamic (implementation)

- OkHttp
- Retrofit

#### Data => storage || dynamic (implementation)

- Jackson
- GSON
- Moshi
- Kotlinx.serialization
- Firebase

#### Flows => core || dynamic (api)

- RxKotlin
- RxAndroid
- RxBinding
- Coroutines

#### Database => storage || dynamic

- Room

#### Testing => testing (api)

- jUnit
- Expekt
- Mockito
- Stetho
- LeakCanary

#### UI testing => uitesting (api)

- Robolectric
- Espresso