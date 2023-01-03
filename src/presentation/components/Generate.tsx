import { Blueprint } from "../../domain/entity/models/Blueprint";
import { Blueprint_Entity } from "../../domain/entity/models/Blueprint_Entity";
import { Blueprint_Icon } from "../../domain/entity/models/Blueprint_Icon";
import { signals, versions } from "../../domain/entity/stuctures/Enums";

export default () => {
  var entities: Blueprint_Entity[] = [];
  var wmax = 2;
  var hmax = 14;
  var current_height = 0;
  var current_width = 0;
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
  while (current_width < wmax) {
    entities.push(
      new Blueprint_Entity(
        wmax * hmax * 3 + current_width,
        "constant-combinator",
        current_width * 2 + 1,
        -1,
        {
          "1": {
            green: [{ entity_id: current_width * 3, circuit_id: 1 }],
          },
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
            {
              signal: signals.signal_0,
              count: -1,
              index: 9,
            },
            {
              signal: signals.signal_1,
              count: -7,
              index: 8,
            },
            {
              signal: signals.signal_2,
              count: -2,
              index: 18,
            },
          ],
        }
      )
    );
    current_width++;
  }
  console.log(substation_cordinates_w);
  console.log(substation_cordinates_h);
  current_width = 0;
  while (current_height < hmax) {
    while (current_width < wmax) {
      if (
        substation_cordinates_h.includes(current_height) &&
        substation_cordinates_w.includes(current_width)
      ) {
        entities.push(
          new Blueprint_Entity(
            current_height * wmax * 3 + current_width * 3,
            "substation",
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
          "arithmetic-combinator",
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
              second_signal: signals.signal_0,
              operation: "-",
              output_signal: signals.signal_each,
            },
          }
        )
      );
      entities.push(
        new Blueprint_Entity(
          current_height * wmax * 3 + current_width * 3 + 1,
          "small-lamp",
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
              first_signal: {
                type: "virtual",
                name: "signal-white",
              },
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
          "small-lamp",
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
              first_signal: {
                type: "virtual",
                name: "signal-white",
              },
              constant: 1,
              comparator: ">",
            },
            use_colors: true,
          }
        )
      );
      current_width += 1;
    }

    if (
      current_width <=
        substation_cordinates_w[substation_cordinates_w.length - 1] &&
      substation_cordinates_h.includes(current_height)
    ) {
      console.log('w'+current_width+':added');
      entities.push(
        new Blueprint_Entity(
          wmax * hmax * 3 +
            wmax +
            substation_cordinates_w[substation_cordinates_w.length - 1] *
              current_height,

          "substation",
          substation_cordinates_w[substation_cordinates_w.length - 1] * 2 + 0.5,
          current_height * 2 + 0.5,
          undefined,
          undefined,
          undefined,[
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
            "substation",
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
