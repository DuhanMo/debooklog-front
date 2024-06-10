import axios from "axios";

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // 기본 URL 설정
  timeout: 10000, // 요청 타임아웃 설정
})

export const fetchBookshelves = async () => {
  try {
    // const response = await apiClient.get('/bookshelves');
    // return response.data.data;
    const mockBookshelves = [
      {
        id: 1,
        memberId: 1,
        name: "길동의 책장1",
        imageUrl: "https://via.placeholder.com/50"
      },
      {
        id: 2,
        memberId: 2,
        name: "책장2",
        imageUrl: "https://via.placeholder.com/50"
      },
      {
        id: 3,
        memberId: 3,
        name: "책장3",
        imageUrl: "https://via.placeholder.com/50"
      },
      {
        id: 4,
        memberId: 4,
        name: "책장4",
        imageUrl: "https://via.placeholder.com/50"
      },
      {
        id: 5,
        memberId: 5,
        name: "책장5",
        imageUrl: "https://via.placeholder.com/50"
      }
    ];
    return mockBookshelves;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch bookshelves');
  }
};