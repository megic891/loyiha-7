import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Article } from 'src/shared/entities/article.entity';
import { ArticleContent } from 'src/shared/entities/article.content';
import { Auth } from 'src/shared/entities/auth.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,

    @InjectRepository(ArticleContent)
    private readonly articleContentRepository: Repository<ArticleContent>,
  ) {}

  
  async create(
    createArticleDto: CreateArticleDto,
    author: Auth,
  ): Promise<Article> {
    const { content, title, description, body, imgurl, isMemberOnly } =
      createArticleDto;

    // contentlarni ArticleContent sifatida yaratish
    const contentEntities = (content || []).map((data) =>
      this.articleContentRepository.create(data as DeepPartial<ArticleContent>),
    );

    const article = this.articleRepository.create({
      author,
      title,
      description,
      body,
      imgurl,
      isMemberOnly,
      content: contentEntities as any,
    });

    return await this.articleRepository.save(article);
  }

  // 🟢 Barcha maqolalarni olish
  async findAll(
    page: number = 1,
    limit: number = 10,
    author?: string,
  ): Promise<{ articles: Article[]; total: number }> {
    const query = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.author', 'author')
      .leftJoinAndSelect('article.content', 'content')
      .where('article.isMemberOnly = :isMemberOnly', { isMemberOnly: false })
      .skip((page - 1) * limit)
      .take(limit);

    if (author) {
      query.andWhere('author.username = :author', { author });
    }

    const [articles, total] = await query.getManyAndCount();
    return { articles, total };
  }

  // 🟢 Maqolani yangilash
  async update(
    id: string, // ✅ Article id turi string
    updateArticleDto: UpdateArticleDto,
    currentUser: Auth,
  ): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (article.author.id !== currentUser.id) {
      throw new ForbiddenException('You can only update your own article');
    }

    Object.assign(article, updateArticleDto);
    return await this.articleRepository.save(article);
  }

  // 🟢 Maqolani o‘chirish
  async remove(id: string, currentUser: Auth): Promise<void> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (article.author.id !== currentUser.id) {
      throw new ForbiddenException('You can only delete your own article');
    }

    await this.articleRepository.remove(article);
  }
}