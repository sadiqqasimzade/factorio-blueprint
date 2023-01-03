export type TBlueprint_Entity_Connections = {
  1?:
    | {
        green: { entity_id: number; circuit_id?: 1|2 }[];
      }
    | { red: {entity_id: number; circuit_id?: 1|2 }[] };
  2?:
    | {
        green: {entity_id: number; circuit_id?: 1|2 }[];
      }
    | { red: {entity_id: number; circuit_id?: 1|2 }[] };
};
