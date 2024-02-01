import { fetchData, putData, getSubscribers, setSubscribers } from '../Assets/js/s3';

describe('Integration tests for s3.js', () => {

    describe('fetchData', () => {
      it('should fetch subscribers', async () => {
        await fetchData();
        expect(getSubscribers()).toContainEqual({ name: "John", status: false });
      });
    });
  
    describe('putData', () => {
        it('should put subscriber', async () => {        
            // Modify subscribers
            getSubscribers().push({name: "Test", status: true});
            await putData();

            // Fetch data to verify
            await fetchData();

            expect(getSubscribers()).toContainEqual({name: "Test", status: true});
        });

        it('should remove subscriber', async () => {
            // Modify subscribers
            setSubscribers(getSubscribers().filter(item => item.name !== "Test"));
            await putData();

            // Fetch data to verify
            await fetchData();
            expect(getSubscribers()).not.toContainEqual({name: "Test", status: true});
        });
    });

    describe('getSubscribers', () => {
        it('should return subscribers', async () => {
            expect(getSubscribers()).toContainEqual({ name: "John", status: false });
        });
      });
  });
