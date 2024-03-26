"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimeModule = void 0;
const common_1 = require("@nestjs/common");
const anime_service_1 = require("./anime.service");
const anime_controller_1 = require("./anime.controller");
const typeorm_1 = require("@nestjs/typeorm");
const anime_entity_1 = require("./entity/anime.entity");
const genres_module_1 = require("../genres/genres.module");
const genres_entity_1 = require("../genres/entity/genres.entity");
let AnimeModule = class AnimeModule {
};
exports.AnimeModule = AnimeModule;
exports.AnimeModule = AnimeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([anime_entity_1.Anime, genres_entity_1.Genres]), genres_module_1.GenresModule],
        controllers: [anime_controller_1.AnimeController],
        providers: [anime_service_1.AnimeService],
    })
], AnimeModule);
//# sourceMappingURL=anime.module.js.map