export interface IBlueprint_Entity {
  entity_number: number;
  name: string;
  position: {
    x: number;
    y: number;
  };
  connections?: {};
  direction?:number
  control_behavior?:{}
}
