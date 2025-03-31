using E_panelApi.Dtos;
using E_panelApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace E_panelApi.Controllers
{
    [Route("api/Poll")]
    [ApiController]
    public class PollController : ControllerBase
    {
        [HttpPost]
        public ActionResult<Poll> Post(CreatePollDto createPollDto)
        {
            using (var context = new AuthContext())
            {
                var Poll = new Poll()
                {
                    Id = Guid.NewGuid().ToString(),
                    Title = createPollDto.Title,
                    Description = createPollDto.Description,
                    CreatedAt = DateTime.UtcNow,
                    EndingAt = createPollDto.EndingAt,
                    PosterId = createPollDto.PosterId,
                };
                if (createPollDto.PosterId != null)
                {
                    context.Add(Poll);
                    context.SaveChanges();
                    return StatusCode(201, Poll);
                }
                return BadRequest();
            }
        }

        [HttpGet("All")]
        public ActionResult<Poll> GetAll()
        {
            using (var context = new AuthContext())
            { 
                return Ok(context.Polls.ToList());
            }
        }

         [HttpGet("AllWithName")]
        public ActionResult<Poll> GetAllWithname()
        {
            using (var context = new AuthContext())
            {
                var result = context.Polls.Select(
                    p => new
                    {
                        p.Id,
                        p.Title,
                        p.Description,
                        p.CreatedAt,
                        p.EndingAt,
                        p.Poster.FullName,
                        p.PosterId,
                        p.Yes,
                        p.No,
                        p.IsVoted,
                    }).ToList();
                return Ok(result);
            }
        }

        [HttpGet("ById")]
        public ActionResult<Poll> GetById(string id)
        {
            using (var context = new AuthContext())
            {
                var Poll = context.Polls.FirstOrDefault(x => x.Id == id);

                if (Poll != null)
                {
                    return StatusCode(200, Poll);
                }
                return NotFound();
            }
        }

        [HttpGet("ByKeyword")]
        public ActionResult<Poll> GetByKeyword(string keyword)
        {
            using (var context = new AuthContext())
            {
                if (string.IsNullOrWhiteSpace(keyword))
                {
                    return GetAll();
                }

                var polls = context.Polls
                    .Where(p => p.Title.Contains(keyword) || p.Description.Contains(keyword))
                    .ToList();

                if (!polls.Any())
                {
                    return NotFound("No polls found matching the keyword.");
                }

                return Ok(polls);
            }
        }

        [HttpPut]
        public ActionResult<Poll> Update(string id, UpdatePollDto updatePollDto)
        {
            using (var context = new AuthContext())
            {
                var existingPoll = context.Polls.FirstOrDefault(x => x.Id == id);
                if (existingPoll != null)
                {
                    existingPoll.Title = updatePollDto.Title;
                    existingPoll.Description = updatePollDto.Description;
                    existingPoll.CreatedAt = DateTime.Now;
                    context.SaveChanges();
                    return StatusCode(200, existingPoll);
                }
                return NotFound();
            }
        }
        
        [HttpPut("Yes")]
        public ActionResult<Poll> VoteYes(string id)
        {
            using (var context = new AuthContext())
            {
                var existingPoll = context.Polls.FirstOrDefault(x => x.Id == id);
                if (existingPoll != null)
                {
                    existingPoll.Yes++;
                    context.SaveChanges();
                    return Ok("Igenre szavaztál.");
                }
                return NotFound();
            }
        }
        
        [HttpPut("No")]
        public ActionResult<Poll> VoteNo(string id)
        {
            using (var context = new AuthContext())
            {
                var existingPoll = context.Polls.FirstOrDefault(x => x.Id == id);
                if (existingPoll != null)
                {
                    existingPoll.No++;
                    context.SaveChanges();
                    return Ok("Nemre szavaztál.");
                }
                return NotFound();
            }
        }
        
        [HttpDelete]
        public ActionResult<Poll> Delete(string id)
        {
            using (var context = new AuthContext())
            {
                var Poll = context.Polls.FirstOrDefault(x => x.Id == id);

                if (Poll != null)
                {
                    context.Remove(Poll);
                    context.SaveChanges();
                    return StatusCode(200, "Szavazás sikeresen törölve!");
                }
                return NotFound();
            }
        }
    }
}
