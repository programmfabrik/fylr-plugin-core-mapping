// GET /api/v1/plugin/extension/core-mapping/core_mapping

const fs = require('fs');

const pg = module.exports;

let info = {}
if (process.argv.length >= 3) {
    info = JSON.parse(process.argv[2])
}

// throws api-error
function throwError(error, description) {
    console.log(JSON.stringify({
        "error": {
            "code": "error",
            "statuscode": 400,
            "realm": "api",
            "error": error,
            "parameters": {},
            "description": description
        }
    }));
    process.exit(0);
}

// list of available mappings from config (which are enabled and have a mapping_json)
let available_mappings = info.config?.plugin['core-mapping']?.config['core_mapping']?.mappings?.filter(m => m.enabled && m.mapping_json) || false;
let available_mapping_names = available_mappings.map(m => m.mapping_name);
let mapping_name = false;

// check if mapping_names are unique and never empty, if not throw error
if (new Set(available_mapping_names).size !== available_mapping_names.length || available_mapping_names.some(n => !n)) {
    throwError("core-mapping-invalid-names", "The core-mapping names are not unique or are empty.");
}

// check if a mapping-name is given in the request, if not, list available mappings
if(info.request?.query?.mapping) {
  mapping_name = info.request?.query?.mapping[0];
  if (!available_mapping_names.includes(mapping_name) && mapping_name !== '') {
      throwError("mapping-not-found", "The specific mapping was not found.");
  }
}

// if mapping_name is not given, show list of available mappings
if (!mapping_name || mapping_name === '') {
    let result = {
        available_mappings: available_mapping_names,
        howto: 'add ?mapping=<mapping_name> to the request to get the mapping for a specific mapping_name'
    };
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
}

let mapping_json = available_mappings.find(m => m.mapping_name === mapping_name)?.mapping_json || false;

if (!mapping_json) {
    throwError("core-mapping-missing-config", "The core-mapping plugin is missing required configuration: no mapping_json found for mapping_name: " + mapping_name);
}

process.stdin.on('data', d => {
    try {
        input += d.toString();
    } catch (e) {
        console.error(`Could not read input into string: ${e.message}`, e.stack);
        process.exit(1);
    }
});

process.stdin.on('end', () => {

    let result = {};

    result = mapping_json;

    console.log(JSON.stringify(result, null, 2));
});