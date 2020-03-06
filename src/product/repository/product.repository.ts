import {EntityRepository, Repository} from 'typeorm';
import {Product} from '../entity/product.entity';
import {GetProductsFilterDto} from '../dto/get-product.dto';
import {CreateProductDto} from '../dto/create-product.dto';
import {PaginatedResult} from '../dto/paginated-result.dto';
import {GetProductsPaginationDto} from '../dto/get-product-pagination.dto';
import {InternalServerErrorException} from '@nestjs/common';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    async getProducts(filterDto: GetProductsFilterDto): Promise<Product[]> {
        const {search} = filterDto;
        const query = this.createQueryBuilder('product');

        if (search) {
            query.andWhere('(product.name LIKE :search)', {search: `%${search}%`});
        }

        const products = await query.getMany();
        return products;
    }

    async getTasksWithPagination(getProductsPaginationDto: GetProductsPaginationDto): Promise<PaginatedResult<Product>> {
        const {search, page, pageSize} = getProductsPaginationDto;
        const query = this.createQueryBuilder('product');

        const count = await query.getCount();
        query.offset((page - 1) * pageSize);
        query.limit(pageSize);

        const products = await query.getMany();

        return {
            data: products,
            pagination: {
                count,
                pageSize,
                page,
            },
        };
    }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const {name, price, discount, description, productImage , lastUpdate} = createProductDto;

        const product = new Product();
        product.name = name;
        product.price = price;
        product.discount = discount;
        product.description = description;
        product.productImage = productImage;
        product.lastUpdate = lastUpdate;

        try {
            await product.save();
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return product;
    }
}
