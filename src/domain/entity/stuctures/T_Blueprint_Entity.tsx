export type T_Blueprint_Entity= {
  entity_number: number;
  name: string;
  position: {
    x: number;
    y: number;
  };
  connections: {
    "1": {
      green: {
        entity_id: number;
      }[];
    };
  };
};
