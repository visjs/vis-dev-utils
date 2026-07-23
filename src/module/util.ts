export type OptionalOptions<Options> = {
  [Key in keyof Options]?:
    | undefined
    | (Options[Key] extends (infer Member)[]
        ? OptionalOptions<Member>[]
        : Options[Key] extends readonly (infer Member)[]
          ? readonly OptionalOptions<Member>[]
          : OptionalOptions<Options[Key]>);
};
