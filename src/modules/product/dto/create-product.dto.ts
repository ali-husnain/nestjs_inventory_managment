export class CreateProductDto {
  readonly sku: string;

  readonly type: number;

  readonly title: string;

  readonly description: string;

  readonly shipping: object;

  readonly pricing: object;

  readonly details: object;
}
