 //only lamps no color
  // while (i < hmax) {
  //   while (j < wmax) {
  //     var entity: Blueprint_Entity = new Blueprint_Entity(
  //       i * wmax + j,
  //       "small-lamp",
  //       j + 0.5,
  //       i + 0.5,
  //       {
  //         "1": {
  //           green: [
  //             j - 1 >= 0
  //               ? { entity_id: i * wmax + j - 1 }
  //               : i - 1 >= 0
  //               ? { entity_id: j * (i - 1) }
  //               : '',
  //             j + 1 != wmax ? { entity_id: i * wmax + j + 1 } : '',
  //           ],
  //         },
  //       }
  //     );
  //     entities.push(entity);
  //     j += 1;
  //   }
  //   j = 0;
  //   i += 1;
  // }

//   while (current_width < wmax) {
//     entities.push(
//       new Blueprint_Entity(
//         wmax * hmax + current_width,
//         "constant-combinator",
//         current_width,
//         -0.5,
//         {
//           "1": {
//             green: [{}],
//           },
//         },
//         undefined,
//         {
//           filters: [
//             {
//               signal: signals.signal_red,
//               count: -6,
//               index: 1,
//             },
//             {
//               signal: signals.signal_green,
//               count: -5,
//               index: 2,
//             },
//             {
//               signal: signals.signal_blue,
//               count: -4,
//               index: 3,
//             },
//             {
//               signal: signals.signal_yellow,
//               count: -3,
//               index: 4,
//             },
//             {
//               signal: signals.signal_pink,
//               count: -2,
//               index: 5,
//             },
//             {
//               signal: signals.signal_cyan,
//               count: -1,
//               index: 6,
//             },
//             {
//               signal: signals.signal_white,
//               count: 1,
//               index: 7,
//             },
//             {
//               signal: signals.signal_0,
//               count: -1,
//               index: 9,
//             },
//             {
//               signal: signals.signal_1,
//               count: -7,
//               index: 8,
//             },
//             {
//               signal: signals.signal_2,
//               count: -2,
//               index: 18,
//             },
//           ],
//         }
//       )
//     );
//     current_width += 2;
//   }

//   current_width = 0;
//   while (current_height < hmax) {
//     while (current_width < wmax) {
//       var entity: Blueprint_Entity = new Blueprint_Entity(
//         current_height * wmax + current_width,
//         "small-lamp",
//         current_width + 0.5,
//         current_height + 0.5,
//         {
//           "1": {
//             green: [
//               current_width - 1 >= 0 //PREV_ENTITY=> check if there is entity before current entity
//                 ? { entity_id: current_height * wmax + current_width - 1 } //True
//                 : current_height - 1 >= 0 //False => check if there is entity above current entity
//                 ? { entity_id: current_width * (current_height - 1) } //True=>Get prev entity id
//                 : "",
//               current_width + 1 != wmax //NEXT_ENTITY=> check if there is entity after current entity
//                 ? { entity_id: current_height * wmax + current_width + 1 } //True=>Get next entity id
//                 : "",
//               current_height - 1 == -1 
//                 ? { entity_id: wmax * hmax + current_width }
//                 : "", 
//             ],
//           },
//         }
//       );
//       entities.push(entity);
//       current_width += 1;
//     }
//     current_width = 0;
//     current_height += 1;
//   }