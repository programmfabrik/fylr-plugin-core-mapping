# fylr-plugin-core-mapping

This plugin provides a configurable JSON mapping via an API extension.

## installation

The latest version of this plugin can be found [here](https://github.com/programmfabrik/fylr-plugin-core-mapping/releases/latest/download/fylr-plugin-core-mapping.zip).

The ZIP can be downloaded and installed using the plugin manager, or used directly (recommended).

Github has an overview page to get a list of [all releases](https://github.com/programmfabrik/fylr-plugin-core-mapping/releases/).

## Konfiguration

- `core_mapping.name`: unique name of the mapping
- `core_mapping.description`: a description
- `core_mapping.enabled`: `true` oder `false`
- `core_mapping.mapping_json`: JSON-String with mapping

## API

The `mapping` extension reads the configurable JSON from and returns it as a JSON response.
Examples: 

`/api/v1/plugin/extension/core-mapping/core_mapping?access_token=ory_foobar&mapping=latest`

`/api/v1/plugin/extension/core-mapping/core_mapping?access_token=ory_foobar&mapping=main`