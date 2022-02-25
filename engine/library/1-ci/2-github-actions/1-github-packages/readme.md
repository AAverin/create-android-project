## Publishing to Github Packages

Find configuration in `./gradle/publishing.gradle`

Github package settings are to be provided 
- via `PACKAGE_REGISTRY_USERNAME` and `PACKAGE_REGISTRY_TOKEN` environment variables
- via `gpr.user` and `gpr.key` project properties that can be populated from local `gradle.properties` file

Don't forget to set correct **github package url**, **groupId** and **artifactId**.

Don't forget to change `version` with every release.

