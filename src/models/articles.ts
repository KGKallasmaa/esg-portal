namespace Articles {
  export type Article = {
    id: string
    source: {
      id: string
      name: string
    }
    votes: {
      upvote: number
      downvote: number
    }
    authors: string
    title: string
    description: string
    url: string
    imageUrl: string
    publishedAt: Date
  }
  export type Vote = {
    id: string
    userId: string
    articleId: string
    type: 'upvote' | 'downvote'
    createdAt: Date
  }
}

export default Articles
