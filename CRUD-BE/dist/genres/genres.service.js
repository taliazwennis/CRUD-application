"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const genres_entity_1 = require("./entity/genres.entity");
let GenresService = class GenresService {
    constructor(genreRepository) {
        this.genreRepository = genreRepository;
    }
    async findAllGenres() {
        return this.genreRepository.find();
    }
    async findGenreById(id) {
        return this.genreRepository.findOneBy({ id });
    }
    async createGenre(genreDto) {
        const genre = this.genreRepository.create(genreDto);
        return this.genreRepository.save(genre);
    }
    async updateGenre(id, genreDto) {
        const genre = await this.genreRepository.findOneBy({ id });
        if (!genre) {
            throw new Error('Genre not found');
        }
        genre.name = genreDto.name;
        return this.genreRepository.save(genre);
    }
    async deleteGenre(id) {
        await this.genreRepository.delete(id);
    }
};
exports.GenresService = GenresService;
exports.GenresService = GenresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(genres_entity_1.Genres)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GenresService);
//# sourceMappingURL=genres.service.js.map