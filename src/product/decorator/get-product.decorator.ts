import { createParamDecorator } from '@nestjs/common';
import {Product} from '../entity/product.entity';

export const GetProduct = createParamDecorator((data, req): Product => {
    return req.products;
});
