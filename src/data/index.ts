import { articles as part1 } from './content'
import { articlesPartTwo as part2 } from './content-part2'
import { Article } from './config'

export const allArticles: Article[] = [...part1, ...part2]

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find(a => a.slug === slug)
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return allArticles.filter(a => a.categorySlug === categorySlug)
}

export function getAllArticles(): Article[] {
  return allArticles
}

export function getRelatedArticles(article: Article): Article[] {
  return article.relatedSlugs
    .map(slug => getArticleBySlug(slug))
    .filter((a): a is Article => a !== undefined)
}
