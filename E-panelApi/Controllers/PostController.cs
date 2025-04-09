using E_panelApi.Dtos;
using E_panelApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_panelApi.Controllers
{
    [Route("api/Post")]
    [ApiController]
    public class PostController : ControllerBase
    {
        [HttpPost] //új segítségkérés feltöltése
        public ActionResult<Post> Post(CreatePostDto createPostDto)
        {
            using (var context = new AuthContext())
            {
                var Post = new Post()
                {
                    Id = Guid.NewGuid().ToString(),
                    Title = createPostDto.Title,
                    Description = createPostDto.Description,
                    Location = createPostDto.Location,
                    CreatedAt = DateTime.UtcNow,
                    PosterId = createPostDto.PosterId,
                };
                if (createPostDto.PosterId != null)
                {
                    context.Add(Post);
                    context.SaveChanges();
                    return StatusCode(201, Post);
                }
                return BadRequest();
            }
        }

        [HttpGet("All")] //összes segítségkérés lekérése
        public ActionResult<Post> GetAll()
        {
            using (var context = new AuthContext())
            {
                return Ok(context.Posts.ToList());
            }
        }

        [HttpGet("AllWithName")] //összes segítségkérés lekérése feltöltő és elfogadó nevével
        public ActionResult<Post> GetAllWithName()
        {
            using (var context = new AuthContext())
            {
                var result = context.Posts.Select(
                    p => new
                    {
                        p.Id,
                        p.Title,
                        p.Description,
                        p.Location,
                        p.PosterId,
                        PosterFullName = context.Aspnetusers
                                                .Where(user => user.Id == p.PosterId)
                                                .Select(user => user.FullName)
                                                .FirstOrDefault(),
                        p.CreatedAt,
                        p.IsAccepted,
                        p.AcceptorId,
                        AcceptorFullName = context.Aspnetusers
                                                  .Where(user => user.Id == p.AcceptorId)
                                                  .Select(user => user.FullName)
                                                  .FirstOrDefault()
                    });

                return Ok(result.ToList());
            }
        }


        [HttpGet("ById")] //azonosító alapján segítségkérés lekérése
        public ActionResult<Post> GetById(string id)
        {
            using (var context = new AuthContext())
            {
                var Post = context.Posts.FirstOrDefault(x => x.Id == id);

                if (Post != null)
                {
                    return StatusCode(200, Post);
                }
                return NotFound();
            }
        }

        [HttpGet("ByKeyword")] //kulcsszó alapján segítségkérés lekérése
        public ActionResult<Post> GetByKeyword(string keyword)
        {
            using (var context = new AuthContext())
            {
                if (string.IsNullOrWhiteSpace(keyword))
                {
                    return GetAll();
                }

                var posts = context.Posts
                    .Where(p => p.Title.Contains(keyword) || p.Description.Contains(keyword))
                    .ToList();

                if (!posts.Any())
                {
                    return NotFound("No posts found matching the keyword.");
                }

                return Ok(posts);
            }
        }

        [HttpPut] //azonosító alapján segítségkérés elfogadása és tartalom módosítása
        public ActionResult<Post> Update(string id, UpdatePostDto updatePostDto)
        {
            using (var context = new AuthContext())
            {
                var existingPost = context.Posts.FirstOrDefault(x => x.Id == id);
                if (existingPost != null)
                {
                    existingPost.Title = updatePostDto.Title;
                    existingPost.Description = updatePostDto.Description;                    
                    existingPost.UpdatedAt = DateTime.Now;
                    existingPost.AcceptorId = updatePostDto.AcceptorId;
                    existingPost.IsAccepted = updatePostDto.IsAccepted;
                    context.SaveChanges();
                    return StatusCode(200, existingPost);
                }
                return NotFound();
            }
        }

        [HttpDelete] //azonosító alapján segítségkérés törlése
        public ActionResult<Post> Delete(string id)
        {
            using (var context = new AuthContext())
            {
                var Post = context.Posts.FirstOrDefault(x => x.Id == id);

                if (Post != null)
                {
                    context.Remove(Post);
                    context.SaveChanges();
                    return StatusCode(200, "Post successfully deleted!");
                }
                return NotFound();
            }
        }

    }
}
