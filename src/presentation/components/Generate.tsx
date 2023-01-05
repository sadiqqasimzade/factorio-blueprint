import { Blueprint } from "../../domain/entity/models/Blueprint";
import { Blueprint_Entity } from "../../domain/entity/models/Blueprint_Entity";
import { Blueprint_Icon } from "../../domain/entity/models/Blueprint_Icon";
import {
  entity_names,
  signals,
  signal_priority,
  versions,
} from "../../domain/entity/stuctures/Enums";

export default (wmax: number, hmax: number, color_indexes: number[][]) => {
  //#region validations
  if (wmax < 5) {
    throw "min width is 5";
  }
  if (hmax < 5) {
    throw "min height is 5";
  }
  if (hmax > 20) {
    throw "max height is 20";
  }
  if (wmax != color_indexes.length) {
    throw "width dont match with array's length";
  }
  //#endregion
  //#region substation array
  var substation_counter = 4;
  var substation_cordinates_w = [4];
  var substation_cordinates_h = [4];
  while (substation_counter + 9 < Math.ceil(wmax / 9) * 9) {
    substation_cordinates_w.push(substation_counter + 9);
    substation_counter += 9;
  }
  substation_counter = 4;
  while (substation_counter + 9 < Math.ceil(hmax / 9) * 9) {
    substation_cordinates_h.push(substation_counter + 9);
    substation_counter += 9;
  }
  //#endregion

  //#region variables
  var entities: Blueprint_Entity[] = [];
  var current_height = 0;
  var current_width = 0;
  //#endregion
  //#region const cambinators
  //color combinator
  entities.push(
    new Blueprint_Entity(
      100000000, //uint64 max
      entity_names.constant_combinator,
      -1,
      -1,
      {
        "1": { red: [{ entity_id: 100000000 - 1 }] },
      },
      undefined,
      {
        filters: [
          {
            signal: signals.signal_red,
            count: -6,
            index: 1,
          },
          {
            signal: signals.signal_green,
            count: -5,
            index: 2,
          },
          {
            signal: signals.signal_blue,
            count: -4,
            index: 3,
          },
          {
            signal: signals.signal_yellow,
            count: -3,
            index: 4,
          },
          {
            signal: signals.signal_pink,
            count: -2,
            index: 5,
          },
          {
            signal: signals.signal_cyan,
            count: -1,
            index: 6,
          },
          {
            signal: signals.signal_white,
            count: 1,
            index: 7,
          },
        ],
      }
    )
  );
  while (current_width < wmax) {
    var combinator_filter = [];
    for (let j = 0; j < color_indexes[current_width].length; j++) {
      combinator_filter.push({
        signal: signal_priority[j],
        count: color_indexes[current_width][j],
        index: j + 1,
      });
    }
    entities.push(
      new Blueprint_Entity(
        wmax * hmax * 3 + current_width,
        entity_names.constant_combinator,
        current_width * 2 + 1,
        -1,
        {
          "1": {
            green: [{ entity_id: current_width * 3, circuit_id: 1 }],
          },
          "2": {
            red: [
              { entity_id: current_width * 3, circuit_id: 1 },
              current_width + 1 != wmax
                ? { entity_id: wmax * hmax * 3 + current_width + 1 }
                : undefined,
            ],
          },
        },
        undefined,
        {
          filters: combinator_filter,
        }
      )
    );
    entities.push(
      new Blueprint_Entity(
        100000000 - (current_width + 1),
        entity_names.medium_electric_pole,
        current_width * 2,
        -1,
        {
          "1": {
            red: [
              { entity_id: current_width * 3, circuit_id: 1 },
              current_width + 1 != wmax
                ? { entity_id: 100000000 - (current_width + 2) }
                : undefined,
            ],
          },
        }
      )
    );
    current_width++;
  }
  current_width = 0;
  //#endregion
  while (current_height < hmax) {
    while (current_width < wmax) {
      if (
        substation_cordinates_h.includes(current_height) &&
        substation_cordinates_w.includes(current_width)
      ) {
        entities.push(
          new Blueprint_Entity(
            current_height * wmax * 3 + current_width * 3,
            entity_names.substation,
            current_width * 2 + 0.5,
            current_height * 2 + 0.5,
            undefined,
            undefined,
            undefined,
            [
              substation_cordinates_w
                .slice(0, substation_cordinates_w.length - 1)
                .includes(current_width + 9) //next
                ? current_height * wmax * 3 + (current_width + 9) * 3
                : substation_cordinates_w.includes(current_width + 9)
                ? wmax * hmax * 3 + wmax + (current_width + 9) * current_height
                : undefined,
              substation_cordinates_h
                .slice(0, substation_cordinates_h.length - 1)
                .includes(current_height + 9) //below
                ? (current_height + 9) * wmax * 3 + current_width * 3
                : substation_cordinates_h.includes(current_height + 9)
                ? wmax * hmax * 3 + wmax + (current_height + 9) * current_width
                : undefined,
            ]
          )
        );
        current_width += 1;
        continue;
      }
      entities.push(
        new Blueprint_Entity(
          current_height * wmax * 3 + current_width * 3,
          entity_names.arithmetic_combinator,
          current_width * 2 + 0.5,
          current_height * 2,
          {
            "1": {
              green: [
                current_height - 1 >= 0 //Prev => check if there is entity above current entity
                  ? {
                      entity_id:
                        current_height * wmax * 3 +
                        current_width * 3 -
                        wmax * 3,
                      circuit_id: 1,
                    }
                  : { entity_id: wmax * hmax * 3 + current_width }, //const combinator id
                current_height + 1 != hmax //Next => check is there is entity under current entity
                  ? {
                      entity_id:
                        current_height * wmax * 3 +
                        current_width * 3 +
                        wmax * 3,
                      circuit_id: 1,
                    }
                  : undefined,
              ],
              red: [
                current_height + 1 != hmax //Next => check is there is entity under current entity
                  ? {
                      entity_id:
                        current_height * wmax * 3 +
                        current_width * 3 +
                        wmax * 3,
                      circuit_id: 1,
                    }
                  : undefined,
                current_height - 1 >= 0 //Prev => check if there is entity above current entity
                  ? {
                      entity_id:
                        current_height * wmax * 3 +
                        current_width * 3 -
                        wmax * 3,
                      circuit_id: 1,
                    }
                  : undefined,
              ],
            },
            "2": {
              red: [
                {
                  entity_id: current_height * wmax * 3 + current_width * 3 + 1,
                },
              ],
            },
          },
          6,
          {
            arithmetic_conditions: {
              first_signal: signals.signal_each,
              second_signal: signal_priority[current_height],
              operation: "-",
              output_signal: signals.signal_each,
            },
          }
        )
      );
      entities.push(
        new Blueprint_Entity(
          current_height * wmax * 3 + current_width * 3 + 1,
          entity_names.small_lamp,
          current_width * 2,
          current_height * 2 + 1,
          {
            "1": {
              red: [
                {
                  entity_id: current_height * wmax * 3 + current_width * 3,
                  circuit_id: 2,
                },
                {
                  entity_id: current_height * wmax * 3 + current_width * 3 + 2,
                },
              ],
            },
          },
          undefined,
          {
            circuit_condition: {
              first_signal: signals.signal_white,
              constant: 1,
              comparator: ">",
            },
            use_colors: true,
          }
        )
      );
      entities.push(
        new Blueprint_Entity(
          current_height * wmax * 3 + current_width * 3 + 2,
          entity_names.small_lamp,
          current_width * 2 + 1,
          current_height * 2 + 1,
          {
            "1": {
              red: [
                {
                  entity_id: current_height * wmax * 3 + current_width * 3 + 1,
                },
              ],
            },
          },
          undefined,
          {
            circuit_condition: {
              first_signal: signals.signal_white,
              constant: 1,
              comparator: ">",
            },
            use_colors: true,
          }
        )
      );
      current_width += 1;
    }
    //substation not affected by loop by width
    if (
      current_width <=
        substation_cordinates_w[substation_cordinates_w.length - 1] &&
      substation_cordinates_h.includes(current_height)
    ) {
      entities.push(
        new Blueprint_Entity(
          wmax * hmax * 3 +
            wmax +
            substation_cordinates_w[substation_cordinates_w.length - 1] *
              current_height,

          entity_names.substation,
          substation_cordinates_w[substation_cordinates_w.length - 1] * 2 + 0.5,
          current_height * 2 + 0.5,
          undefined,
          undefined,
          undefined,
          [
            substation_cordinates_h.includes(current_height + 9)
              ? wmax * hmax * 3 +
                wmax +
                (current_height + 9) *
                  substation_cordinates_w[substation_cordinates_w.length - 1]
              : undefined,
          ]
        )
      );
    }
    current_width = 0;
    current_height += 1;
  }
  current_width = 0;
  //substation not affected by loop by height
  if (
    current_height <=
    substation_cordinates_h[substation_cordinates_h.length - 1]
  ) {
    while (current_width < wmax) {
      if (substation_cordinates_w.includes(current_width)) {
        entities.push(
          new Blueprint_Entity(
            wmax * hmax * 3 +
              wmax +
              substation_cordinates_h[substation_cordinates_h.length - 1] *
                current_width,
            entity_names.substation,
            current_width * 2 + 0.5,
            substation_cordinates_h[substation_cordinates_h.length - 1] * 2 +
              0.5,
            undefined,
            undefined,
            undefined,
            [
              substation_cordinates_w.includes(current_width + 9)
                ? wmax * hmax * 3 +
                  wmax +
                  (current_width + 9) *
                    substation_cordinates_h[substation_cordinates_h.length - 1]
                : undefined,
            ]
          )
        );
      }
      current_width++;
    }
  }

  var result: Blueprint = new Blueprint(
    [new Blueprint_Icon(signals.signal_white, 1)],
    entities,
    versions.latest
  );
  return result;
};
