import React from "react";
import { deflate, inflate } from "pako";
import { Buffer } from "buffer";
import Generate from "./Generate";

export const App: React.FC<{}> = () => {
  //FIX INTERFACE
  function encode_blueprint(myjson: Object): string {
    var blueprint = JSON.stringify(myjson);
    var encoded = deflate(blueprint, { level: 9 });
    var based = Buffer.from(encoded).toString("base64");
    return 0 + based;
  }
  function decode_blueprint(blueprint: string): JSON {
    var blueprint = blueprint.substring(1);
    var based = Buffer.from(blueprint, "base64");
    var decoded = inflate(based, { to: "string" });
    var jsoned = JSON.parse(decoded.toString());
    console.log(jsoned);
    return jsoned;
  }
  return (
    <>
      <h2>Decoded</h2>
      {JSON.stringify(
        decode_blueprint(
        "0eNrtmd9u2yAUxt+Fa7syxP8v9iJTFBGHNmgYLIzTRZHffWCvDk1NazJN0+RcJIpj+AHfOd8BJxewZx1pJOUKlBdAK8FbUH6/gJa+cMzMd+rcEFACqkgNAsBxba6wpOpYE0WrsBL1nnKshAR9ACg/kJ+ghP02AIQrqigZgcPFece7ek+kbjChzJAKc2WDAtCIVvcV3MxA80IUwackAGf9EUbRU6KHOlBJqrFNGhiMkoLt9uSIT1QzdMdnyhSRjgWdqFSd/maayNgilORgFlKJzmgSptaaAg/MiySE26BkAiEvkAmQzYknzsaLcyaMiVebtJlIsRepofyHzUETJ/HiVGf8TiE4cVIvzutRJ6cFunIyLw60J5NNkNwLEs2vqPCCoHl5Yd5vhxucj5nfGhY0b2O6WUajBx1W3ZbKqqNquNSm7HszjxsvIk8vwqJ4ePHhxb/qxWh+UYWfAZJlBthcR68xYyHDdTO7B6G3vDcO6OcT/W1Afe8wdX+mslW7e1QcDTkIqU3ZYDmYsgTfzG0mXmirN+H3g107RXOdupbo9kwYMyrZEYegxnuf1xNkSWmuU4e88RfHhlmlf+ucLywvV/JVi/YO5QmujkaklhjMzi9fRUO00sM0QaibiE41nffgvU+Gw5sYwOhjygcAOQK6cUQsuSNi0SNiiyJ26xqIfCKWOSKWLi1hcN0lzJXx2VL9onXrl3y+BeQOefNl8lony3XK67J34X9Cydao3+3296HYuvxvOt59SEn/ky0P/qMtL/bZ4QpXhKB/iV6nB9AXHohdCqM/OPY9POD9KOr2AHQ9qcKN/zlvlSZwVpHY/ySyzioypuA2GH/5L60/CgJwIrIdJoByGGcFytJEv2DW978AFRRD9g=="
        ),
        null,
        2
      )}
      <h2>Encoded</h2>
      <p style={{ wordBreak: "break-all" }}>
        {encode_blueprint(
          JSON.parse(
            JSON.stringify({
              blueprint: Generate(),
            }).replace(/(,"")|("",)/g, "")
          )
        )}
      </p>
      <p>NEw Json</p>
      {JSON.stringify(Generate()).replace(/(,"")/g, "")}
      <p>B</p>
      {encode_blueprint({
  "blueprint": {
    "icons": [
      {
        "signal": {
          "type": "item",
          "name": "arithmetic-combinator"
        },
        "index": 1
      }
    ],
    "entities": [
      {
        "entity_number": 1,
        "name": "constant-combinator",
        "position": {
          "x": 0.5,
          "y": 0.5
        },
        "control_behavior": {
          "filters": [
            {
              "signal": {
                "type": "virtual",
                "name": "signal-red"
              },
              "count": -6,
              "index": 1
            },
            {
              "signal": {
                "type": "virtual",
                "name": "signal-green"
              },
              "count": -5,
              "index": 2
            },
            {
              "signal": {
                "type": "virtual",
                "name": "signal-blue"
              },
              "count": -4,
              "index": 3
            },
            {
              "signal": {
                "type": "virtual",
                "name": "signal-yellow"
              },
              "count": -3,
              "index": 4
            },
            {
              "signal": {
                "type": "virtual",
                "name": "signal-pink"
              },
              "count": -2,
              "index": 5
            },
            {
              "signal": {
                "type": "virtual",
                "name": "signal-cyan"
              },
              "count": -1,
              "index": 6
            },
            {
              "signal": {
                "type": "virtual",
                "name": "signal-white"
              },
              "count": 1,
              "index": 7
            },
            {
              "signal": {
                "type": "virtual",
                "name": "signal-1"
              },
              "count": -7,
              "index": 8
            },
            {
              "signal": {
                "type": "virtual",
                "name": "signal-0"
              },
              "count": -1,
              "index": 9
            },
            {
              "signal": {
                "type": "virtual",
                "name": "signal-2"
              },
              "count": -2,
              "index": 18
            }
          ]
        },
        "connections": {
        }
      },
      {
        "entity_number": 2,
        "name": "constant-combinator",
        "position": {
          "x": 1.5,
          "y": 0.5
        },
        "control_behavior": {
          "filters": [
            {
              "signal": {
                "type": "virtual",
                "name": "signal-red"
              },
              "count": -6,
              "index": 1
            },
            {
              "signal": {
                "type": "virtual",
                "name": "signal-green"
              },
              "count": -5,
              "index": 2
            },
            {
              "signal": {
                "type": "virtual",
                "name": "signal-blue"
              },
              "count": -4,
              "index": 3
            },
            {
              "signal": {
                "type": "virtual",
                "name": "signal-yellow"
              },
              "count": -3,
              "index": 4
            },
            {
              "signal": {
                "type": "virtual",
                "name": "signal-pink"
              },
              "count": -2,
              "index": 5
            },
            {
              "signal": {
                "type": "virtual",
                "name": "signal-cyan"
              },
              "count": -1,
              "index": 6
            },
            {
              "signal": {
                "type": "virtual",
                "name": "signal-white"
              },
              "count": 1,
              "index": 7
            },
            {
              "signal": {
                "type": "virtual",
                "name": "signal-0"
              },
              "count": -2,
              "index": 9
            }
          ]
        },
        "connections": {
        }
      },
      {
        "entity_number": 3,
        "name": "small-lamp",
        "position": {
          "x": 1.5,
          "y": 1.5
        },
        "control_behavior": {
          "circuit_condition": {
            "first_signal": {
              "type": "virtual",
              "name": "signal-white"
            },
            "constant": 1,
            "comparator": ">"
          },
          "use_colors": true
        },
        "connections": {
          "1": {
            "red": [
              {
                "entity_id": 6
              }
            ]
          }
        }
      },
      {
        "entity_number": 4,
        "name": "arithmetic-combinator",
        "position": {
          "x": -2,
          "y": -2.5
        },"direction": 6,
        "control_behavior": {
          "arithmetic_conditions": {
            "first_signal": {
              "type": "virtual",
              "name": "signal-each"
            },
            "second_signal": {
              "type": "virtual",
              "name": "signal-0"
            },
            "operation": "-",
            "output_signal": {
              "type": "virtual",
              "name": "signal-each"
            }
          }
        },
        "connections": {
          "1": {
            "green": [
              {
                "entity_id": 1
              },
              {
                "entity_id": 10
              }
            ]
          },
          "2": {
            "red": [
              {
                "entity_id": 3
              }
            ]
          }
        }
      },
      {
        "entity_number": 5,
        "name": "arithmetic-combinator",
        "position": {
          "x": -0,
          "y": -2.5
        },"direction": 6,
        "control_behavior": {
          "arithmetic_conditions": {
            "first_signal": {
              "type": "virtual",
              "name": "signal-each"
            },
            "second_signal": {
              "type": "virtual",
              "name": "signal-0"
            },
            "operation": "-",
            "output_signal": {
              "type": "virtual",
              "name": "signal-each"
            }
          }
        },
        "connections": {
          "1": {
            "green": [
              {
                "entity_id": 2
              },
              {
                "entity_id": 12
              }
            ]
          },
          "2": {
            "red": [
              {
                "entity_id": 7
              }
            ]
          }
        }
      },
      {
        "entity_number": 6,
        "name": "small-lamp",
        "position": {
          "x": -1.5,
          "y": -1.5
        },
        "control_behavior": {
          "circuit_condition": {
            "first_signal": {
              "type": "virtual",
              "name": "signal-white"
            },
            "constant": 1,
            "comparator": ">"
          },
          "use_colors": true
        },
        "connections": {
          "1": {
            "red": [
              {
                "entity_id": 3
              }
            ]
          }
        }
      },
      {
        "entity_number": 7,
        "name": "small-lamp",
        "position": {
          "x": -2.5,
          "y": -1.5
        },
        "control_behavior": {
          "circuit_condition": {
            "first_signal": {
              "type": "virtual",
              "name": "signal-white"
            },
            "constant": 1,
            "comparator": ">"
          },
          "use_colors": true
        },
        "connections": {
          "1": {
            "red": [
              {
                "entity_id": 5
              },
              {
                "entity_id": 8
              }
            ]
          }
        }
      },
      {
        "entity_number": 8,
        "name": "small-lamp",
        "position": {
          "x": -1.5,
          "y": -2.5
        },
        "control_behavior": {
          "circuit_condition": {
            "first_signal": {
              "type": "virtual",
              "name": "signal-white"
            },
            "constant": 1,
            "comparator": ">"
          },
          "logistic_condition": {
            "constant": 0,
            "comparator": ">"
          },
          "use_colors": true
        },
        "connections": {
          "1": {
            "red": [
              {
                "entity_id": 7
              }
            ]
          }
        }
      },
      {
        "entity_number": 9,
        "name": "small-lamp",
        "position": {
          "x": -2.5,
          "y": -3.5
        },
        "control_behavior": {
          "circuit_condition": {
            "first_signal": {
              "type": "virtual",
              "name": "signal-white"
            },
            "constant": 1,
            "comparator": ">"
          },
          "use_colors": true
        },
        "connections": {
          "1": {
            "red": [
              {
                "entity_id": 10
              },
              {
                "entity_id": 13
              }
            ]
          }
        }
      },
      {
        "entity_number": 10,
        "name": "arithmetic-combinator",
        "position": {
          "x": -2,
          "y": -4.5
        },"direction": 6,
        "control_behavior": {
          "arithmetic_conditions": {
            "first_signal": {
              "type": "virtual",
              "name": "signal-each"
            },
            "second_signal": {
              "type": "virtual",
              "name": "signal-1"
            },
            "operation": "-",
            "output_signal": {
              "type": "virtual",
              "name": "signal-each"
            }
          }
        },
        "connections": {
          "1": {
            "green": [
              {
                "entity_id": 4,
                "circuit_id": 1
              }
            ]
          },
          "2": {
            "red": [
              {
                "entity_id": 9
              }
            ]
          }
        }
      },
      {
        "entity_number": 11,
        "name": "small-lamp",
        "position": {
          "x": -0.5,
          "y": -5.5
        },
        "control_behavior": {
          "circuit_condition": {
            "first_signal": {
              "type": "virtual",
              "name": "signal-white"
            },
            "constant": 1,
            "comparator": ">"
          },
          "logistic_condition": {
            "constant": 0,
            "comparator": ">"
          },
          "use_colors": true
        },
        "connections": {
          "1": {
            "red": [
              {
                "entity_id": 12
              },
              {
                "entity_id": 14
              }
            ]
          }
        }
      },
      {
        "entity_number": 12,
        "name": "arithmetic-combinator",
        "position": {
          "x": -0,
          "y": -4.5
        },"direction": 6,
        "control_behavior": {
          "arithmetic_conditions": {
            "first_signal": {
              "type": "virtual",
              "name": "signal-each"
            },
            "second_signal": {
              "type": "virtual",
              "name": "signal-1"
            },
            "operation": "-",
            "output_signal": {
              "type": "virtual",
              "name": "signal-each"
            }
          }
        },
        "connections": {
          "1": {
            "green": [
              {
                "entity_id": 5
              }
            ]
          },
          "2": {
            "red": [
              {
                "entity_id": 11
              }
            ]
          }
        }
      },
      {
        "entity_number": 13,
        "name": "small-lamp",
        "position": {
          "x": -1.5,
          "y": -3.5
        },
        "control_behavior": {
          "circuit_condition": {
            "first_signal": {
              "type": "virtual",
              "name": "signal-white"
            },
            "constant": 1,
            "comparator": ">"
          },
          "use_colors": true
        },
        "connections": {
          "1": {
            "red": [
              {
                "entity_id": 9
              }
            ]
          }
        }
      },
      {
        "entity_number": 14,
        "name": "small-lamp",
        "position": {
          "x": -1.5,
          "y": -4.5
        },
        "control_behavior": {
          "circuit_condition": {
            "first_signal": {
              "type": "virtual",
              "name": "signal-white"
            },
            "constant": 1,
            "comparator": ">"
          },
          "use_colors": true
        },
        "connections": {
          "1": {
            "red": [
              {
                "entity_id": 11
              }
            ]
          }
        }
      }
    ],
    "item": "blueprint",
    "version": 281479276527617
  }
})}
    </>
  );
};
