import { fetchData, putData, getForum, setForum } from '../Assets/js/s3-forum';

describe('Integration tests for s3-forum.js', () => {

    describe('fetchData', () => {
      it('should fetch forum', async () => {
        await fetchData();
        expect(getForum()).toContainEqual({ name: "John", post: "I like pasta" });
      });
    });
  
    describe('putData', () => {
        it('should put post', async () => {        
            // Modify posts
            getForum().push({name: "Test", post: "Test post"});
            await putData();

            // Fetch data to verify
            await fetchData();

            expect(getForum()).toContainEqual({name: "Test", post: "Test post"});
        });

        it('should remove post', async () => {
            // Modify posts
            setForum(getForum().filter(item => item.name !== "Test"));
            await putData();

            // Fetch data to verify
            await fetchData();
            expect(getForum()).not.toContainEqual({name: "Test", post: "Test post"});
        });
    });

    describe('getForum', () => {
        it('should return forum', async () => {
            expect(getForum()).toContainEqual({ name: "John", post: "I like pasta" });
        });
      });
  });
