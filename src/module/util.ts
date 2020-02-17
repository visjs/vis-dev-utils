export type OptionalOptions<Options> = {
  [Key in keyof Options]?:
    | undefined
    | (Options[Key] extends Array<infer Member>
        ? Array<OptionalOptions<Member>>
        : Options[Key] extends ReadonlyArray<infer Member>
        ? ReadonlyArray<OptionalOptions<Member>>
        : OptionalOptions<Options[Key]>);
};
