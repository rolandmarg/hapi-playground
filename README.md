# hapi-playground

Experimenting with modern libraries was a tiresome experience, apollo graphql, typescript, nextjs, next-auth, typeorm are all cool things themselves but integrating them in one application is really cumbersome process and bloats projects with questionable code. After trying to grapple with so much innovation, I appreciated stability and reliability of battle tested code even more.

I wanted to try out something battle tested and well documented and I've had heard many good things about Hapi. It's secure, has builtin authorization/authentication module, rich and clean ecosystem, with excellent libraries like @hapi/iron and @hapi/joi(well, no more joi moved to sideway/joi), first class support for caching, cookies and modular design/plugins. While writing this for some reason I felt a duty to talk shit about express & middleware architecture. Overall I feel really happi about using hapi, plugins are great, they are isolated and easily testable. 

I really like when typescript gives me suggestions and hints while writing code and if it does not, I'm not doing something right, but for this project I chose to stick with javascript, to avoid code bloat and compilation step. This guaranteed development speed for start.

Using joi is a bless, it validates my api, and with hapi plugin I'm able to generate swagger documentation from my joi validated endpoints. I wish their testing libraries (@hapi code/lab) were mode advanced and utilized joi schemas for fuzz testing.

Identifying as a back end developer, sometimes I feel guilty that I'm not strong enough with sql, and using ORM-s to talk with database does not help with that. I decided to ditch typeorm, sequelize and likes to stick with pg library in this project, it gives me ability to write raw sql queries while retaining ability to use dynamic parameters in queries.

p.s. sometimes I dream about having one model, which is used by joi, typescript, database, graphql. There are really cool js libraries out there but making all those young children play together nicely introduces so much bloat and inconsistency. 
