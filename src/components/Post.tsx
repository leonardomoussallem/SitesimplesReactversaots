import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: string;
}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: string[];
 
}
export function Post({author, publishedAt, content }: PostProps){
    const [comments, setComments] = useState([
        "post muito bacana"
        
    ])

    const[newCommentText, setNewCommentText] = useState('')


    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'ás' HH:mm'h'",{
        locale: ptBR,
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()


        setComments([...comments, newCommentText]);
        setNewCommentText('');

    }

    function handleNewcommentChange(event: ChangeEvent<HTMLAnchorElement>) { event
        event?.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function handleNewcommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
        event?.target.setCustomValidity('Esse campo é obrigatorio');
    }

    function deleteComment(commentToDelete: string){
        const commentsWithoutDeleteOne = comments.filter(comment => {
            return comment != commentToDelete;
        })

        setComments(commentsWithoutDeleteOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar 
                    src={author.avatarUrl}/>
                    <div className={styles.authorInfo}>
                    <strong>{author.name}</strong>
                    <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                    </time>
            </header>
            <div className={styles.content}>
                {content.map(line => {
                if (line.type === 'paragraph') {
                    return <p key={line.content}>{line.content}</p>;
                }   else if (line.type === 'link') {
                    return <p key={line.content}><a href='#'>{line.content}</a></p>;
                }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe Seu Feedback</strong>

                <textarea
                    name="comment"
                    placeholder='deixei um comentario'
                    value={newCommentText}
                    onChange={handleNewcommentChange}
                    onInvalid={handleNewcommentInvalid}
                    required
                />

                <footer>
                    <button type="submit"disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (
                        <Comment 
                        key={comment} 
                        content={comment} 
                        onDeleteComment={deleteComment}/>
                    )
                    })}
            </div>
        </article>
    )
}