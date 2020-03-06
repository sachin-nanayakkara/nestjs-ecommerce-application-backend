import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ProductRepository} from '../repository/product.repository';
import {Product} from '../entity/product.entity';
import {GetProductsFilterDto} from '../dto/get-product.dto';
import {CreateProductDto} from '../dto/create-product.dto';
import {PaginatedResult} from '../dto/paginated-result.dto';
import {GetProductsPaginationDto} from '../dto/get-product-pagination.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository,
    ) {
    }

    async getProducts(
        filterDto: GetProductsFilterDto,
    ): Promise<Product[]> {
        return this.productRepository.getProducts(filterDto);
    }

    async getTasksWithPagination(getProductsPaginationDto: GetProductsPaginationDto): Promise<PaginatedResult<Product>> {
        return this.productRepository.getTasksWithPagination(getProductsPaginationDto);
    }

    async getProductById(id: number): Promise<Product> {
        const found = await this.productRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return found;
    }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        return this.productRepository.createProduct(createProductDto);
    }

    async deleteProduct(id: number): Promise<void> {
        const result = await this.productRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }

    async updateProducts(id: number, createProductDto: CreateProductDto): Promise<Product> {
        const {name, price, discount, description, productImage , lastUpdate} = createProductDto;

        const product = await this.getProductById(id);
        product.name = name;
        product.price = price;
        product.discount = discount;
        product.description = description;
        product.productImage = productImage;
        product.lastUpdate = lastUpdate;
        await product.save();
        return product;
    }
}
