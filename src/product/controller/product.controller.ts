import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {ProductService} from '../service/product.service';
import {GetProductsFilterDto} from '../dto/get-product.dto';
import {Product} from '../entity/product.entity';
import {CreateProductDto} from '../dto/create-product.dto';
import {PaginatedResult} from '../dto/paginated-result.dto';
import {GetProductsPaginationDto} from '../dto/get-product-pagination.dto';
import {AuthGuard} from '@nestjs/passport';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
    constructor(private productService: ProductService) {
    }

    @Get()
    getProducts(@Query(ValidationPipe) filterDto: GetProductsFilterDto): Promise<Product[]> {
        return this.productService.getProducts(filterDto);
    }

    @Get('pagination')
    getProductsWithPagination(
        @Query(new ValidationPipe({ transform: true })) getProductsPaginationDto: GetProductsPaginationDto,
    ): Promise<PaginatedResult<Product>> {
        return this.productService.getTasksWithPagination(getProductsPaginationDto);
    }

    @Get('/:id')
    getProductsById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productService.getProductById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.createProduct(createProductDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.productService.deleteProduct(id);
    }

    @Patch('/:id')
    updateProductStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() createProductDto: CreateProductDto,
    ): Promise<Product> {
        return this.productService.updateProducts(id, createProductDto);
    }
}
