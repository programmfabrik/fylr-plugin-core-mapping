# fylr-plugin-core-mapping

Dieses Plugin liefert ein konfigurierbares JSON-Mapping über eine API-Erweiterung.

## Installation

- Pluginverzeichnis in `extensionplugins/` ablegen.
- Mit `fylr-build-plugin` bauen und ausliefern.

## Konfiguration

- `core_mapping.enabled`: `true` oder `false`
- `core_mapping.mapping_json`: JSON-String mit dem gewünschten Mapping

## API

Die Erweiterung `mapping` liest das konfigurierbare JSON aus `core_mapping.mapping_json` und gibt es als JSON-Antwort zurück.
