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
exports.AnimeController = void 0;
const common_1 = require("@nestjs/common");
const anime_service_1 = require("./anime.service");
const anime_dto_1 = require("./dto/anime.dto");
let AnimeController = class AnimeController {
    constructor(animeService) {
        this.animeService = animeService;
    }
    create(animeDto) {
        return this.animeService.createAnime(animeDto);
    }
    findAll(filter) {
        return this.animeService.findAllAnime(filter);
    }
    findOne(id) {
        return this.animeService.findAnimeById(+id);
    }
    update(id, animeDto) {
        return this.animeService.updateAnime(+id, animeDto);
    }
    remove(id) {
        return this.animeService.deleteAnime(+id);
    }
};
exports.AnimeController = AnimeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [anime_dto_1.AnimeDto]),
    __metadata("design:returntype", void 0)
], AnimeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnimeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnimeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, anime_dto_1.AnimeDto]),
    __metadata("design:returntype", void 0)
], AnimeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnimeController.prototype, "remove", null);
exports.AnimeController = AnimeController = __decorate([
    (0, common_1.Controller)('anime'),
    __metadata("design:paramtypes", [anime_service_1.AnimeService])
], AnimeController);
//# sourceMappingURL=anime.controller.js.map