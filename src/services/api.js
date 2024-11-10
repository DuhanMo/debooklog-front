import axios from "axios";
const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

const apiClient = axios.create({
  baseURL: `${baseUrl}`, // 기본 URL 설정
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

export const fetchBookshelfById = async (bookshelfId) => {
  try {
    // const response = await apiClient.get(`/books?bookshelfId=${bookshelfId}`);
    // return response.data.data;
    const mockData = {
      message: "Success",
      data: {
        name: "책장1",
        books: [
          {
            id: 0,
            bookshelfId: bookshelfId,
            title: "목킹된 책 제목",
            author: "작가 이름",
            isbn: ["1234567890"],
            thumbnail: "https://via.placeholder.com/150",
            createdAt: "2024-09-04T08:39:35.080Z",
            updatedAt: "2024-09-04T08:39:35.080Z"
          },
          {
            id: 1,
            bookshelfId: bookshelfId,
            title: "두 번째 책",
            author: "다른 작가",
            isbn: ["0987654321"],
            thumbnail: "https://via.placeholder.com/150",
            createdAt: "2024-09-04T08:39:35.080Z",
            updatedAt: "2024-09-04T08:39:35.080Z"
          }
        ]
      }
    };
    return mockData.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch books');
  }
};

export const redirectOauth2LoginPage = async (provider) => {
  window.location.href = `${baseUrl}/oauth2/code/${provider}`;
};

export const getAccessTokenFromUrl = async (code, provider) => {
  try {
    const response = await apiClient.post('/oauth2/login', {
      code,
      provider
    });

    if (response.status === 200) {
      const {accessToken, refreshToken} = response.data

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      return {accessToken, refreshToken}
    } else {
      throw new Error("Unexpected response status: " + response.status);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to fetch access token";
    console.error("Error fetching access token:", errorMessage);
    throw new Error(errorMessage);
  }
};