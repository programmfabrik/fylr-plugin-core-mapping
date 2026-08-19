# fylr-plugin-core-mapping

This plugin provides a configurable JSON mapping via an API extension. The mapping is intended to map the fylr-json to another definition. The design of the mapping is entirely up to you.

## installation

The latest version of this plugin can be found [here](https://github.com/programmfabrik/fylr-plugin-core-mapping/releases/latest/download/fylr-plugin-core-mapping.zip).

The ZIP can be downloaded and installed using the plugin manager, or used directly (recommended).

Github has an overview page to get a list of [all releases](https://github.com/programmfabrik/fylr-plugin-core-mapping/releases/).

## Konfiguration

- `core_mapping.name`: unique name of the mapping
- `core_mapping.description`: a description
- `core_mapping.enabled`: `true` oder `false`
- `core_mapping.mapping_json`: JSON-String with mapping

Example-Mapping:

```
{
  "created_at_source": "$._created",
  "description": "$.objekt['_nested:objekt__objektbeschreibungen'][?(@.lk_dante_veroeffentlichen.conceptURI == 'http://uri.gbv.de/terminology/publication_target/dde64532-1b16-42f2-b100-0d758653521b')]['_nested:objekt__objektbeschreibungen__texte'][?(@.lk_dante_sprache.conceptURI == 'http://id.loc.gov/vocabulary/iso639-2/deu')].text",
  "harvested_at": "{{current_datetime_iso8601}}",
  "id": "$._global_object_id",
  "keywords": [
    "$.objekt['_nested:objekt__schlagworte_objekttypisierung'][*].lk_gnd.conceptName",
    "$.objekt['_nested:objekt__aat'][*].lk_getty_aat.conceptName",
    "$.objekt.lk_dante_kategorie.conceptName",
    "$.objekt['_nested:objekt__freie_klassifikationen'][*].bezeichnung",
    "$.objekt['_nested:objekt__taxonomie'][*].text"
  ],
  "labels": "$._standard['1'].text['de-DE']",
  "landingpage_url": "https://beispieleinrichtung.de/objekt/{{$._uuid}}",
  "language": "de-DE",
  "license_content": null,
  "license_metadata": {
    "fallback": {
      "resolve": {
        "endpoint": "/api/v1/pool/{id}",
        "id": "$.objekt._pool.pool._id",
        "target_path": "$.pool.custom_data.lk_dante_lizenz_metadaten.conceptURI"
      }
    },
    "primary": "$.objekt.lk_dante_lizenz_metadaten.conceptURI"
  },
  "license_thumbnail": {
    "fallback": {
      "resolve": {
        "endpoint": "/api/v1/pool/{id}",
        "id": "$.objekt._pool.pool._id",
        "target_path": "$.pool.custom_data.lk_dante_lizenz_medien.conceptURI"
      }
    },
    "primary": "$.objekt['_nested:objekt__bilder_publik'][0].lk_dante_lizenz.conceptURI"
  },
  "modified_at_source": "$._last_modified",
  "source_id": {
    "resolve": {
      "endpoint": "/api/v1/pool/{id}",
      "id": "$.objekt._pool.pool._id",
      "target_path": "$.pool.custom_data.isil"
    }
  },
  "source_name": {
    "resolve": {
      "endpoint": "/api/v1/pool/{id}",
      "id": "$.objekt._pool.pool._id",
      "target_path": "$.pool.custom_data.einrichtungsname"
    }
  },
  "source_url": {
    "resolve": {
      "endpoint": "/api/v1/pool/{id}",
      "id": "$.objekt._pool.pool._id",
      "target_path": "$.pool.custom_data.webseite"
    }
  },
  "sub_labels": "$._standard['2'].text['de-DE']",
  "thumbnail": "$._standard.eas['1'][0].versions.preview.url"
}
```

## API

The `mapping` extension reads the configurable JSON from and returns it as a JSON response.
Examples: 

`/api/v1/plugin/extension/core-mapping/core_mapping?access_token=ory_foobar&mapping=latest`

`/api/v1/plugin/extension/core-mapping/core_mapping?access_token=ory_foobar&mapping=main`