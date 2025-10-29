declare module 'ogl' {
  export class Renderer {
    constructor(options?: { alpha?: boolean; premultipliedAlpha?: boolean });
    gl: WebGLRenderingContext;
    setSize(width: number, height: number): void;
    render(params: { scene: Mesh }): void;
  }

  export type UniformValue = number | boolean | string | Float32Array | WebGLTexture | ArrayBuffer | object | null;

  export class Program {
    constructor(
      gl: WebGLRenderingContext,
      options: {
        vertex: string;
        fragment: string;
        uniforms?: Record<string, { value: UniformValue }>;
      }
    );
    uniforms: Record<string, { value: UniformValue }>;
  }

  export class Mesh {
    constructor(
      gl: WebGLRenderingContext,
      options: { geometry: Triangle; program: Program }
    );
  }

  export class Color {
    constructor(r: number, g: number, b: number);
  }

  export class Triangle {
    constructor(gl: WebGLRenderingContext);
  }
}
