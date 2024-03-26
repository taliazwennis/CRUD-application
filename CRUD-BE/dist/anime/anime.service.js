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
exports.AnimeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const anime_entity_1 = require("./entity/anime.entity");
const genres_entity_1 = require("../genres/entity/genres.entity");
let AnimeService = class AnimeService {
    constructor(animeRepository, genreRepository) {
        this.animeRepository = animeRepository;
        this.genreRepository = genreRepository;
    }
    async createAnime(animeDto) {
        const anime = new anime_entity_1.Anime();
        anime.name = animeDto.name;
        anime.description = animeDto.description;
        anime.rating = animeDto.rating;
        anime.releaseYear = animeDto.releaseYear;
        anime.genres = await Promise.all(animeDto.genres.map(async (genreId) => this.genreRepository.findOneBy({ id: genreId })));
        return this.animeRepository.save(anime);
    }
    findAllAnime(filter) {
        if (!filter) {
            return this.animeRepository.find({ relations: ['genres'] });
        }
        return this.animeRepository.find({
            where: { name: (0, typeorm_2.ILike)(`%${filter}%`) },
            relations: ['genres'],
        });
    }
    findAnimeById(id) {
        return this.animeRepository.findOne({
            where: {
                id,
            },
            relations: ['genres'],
        });
    }
    async updateAnime(id, animeDto) {
        const anime = await this.animeRepository.findOneBy({ id });
        anime.name = animeDto.name;
        anime.description = animeDto.description;
        anime.rating = animeDto.rating;
        anime.releaseYear = animeDto.releaseYear;
        anime.genres = await Promise.all(animeDto.genres.map(async (genreId) => this.genreRepository.findOneBy({ id: genreId })));
        return this.animeRepository.save(anime);
    }
    deleteAnime(id) {
        return this.animeRepository.delete(id);
    }
};
exports.AnimeService = AnimeService;
exports.AnimeService = AnimeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(anime_entity_1.Anime)),
    __param(1, (0, typeorm_1.InjectRepository)(genres_entity_1.Genres)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AnimeService);
//# sourceMappingURL=anime.service.js.map