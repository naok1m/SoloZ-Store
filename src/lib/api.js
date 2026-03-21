const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const parseJson = async (response) => {
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(payload.error || payload.message || 'Erro na API')
    error.status = response.status
    throw error
  }
  return payload
}

const request = async (path, options = {}) => {
  const isFormData = options.body instanceof FormData
  const headers = {
    ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
    'Cache-Control': 'no-store',
    Pragma: 'no-cache',
    ...(options.headers || {}),
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    cache: 'no-store',
  })

  return parseJson(response)
}

const withAuth = (token) => ({ Authorization: `Bearer ${token}` })

export const api = {
  baseUrl: API_URL,
  listProducts: () => request(`/products?ts=${Date.now()}`),
  listAdminProducts: (token) =>
    request(`/products/admin?ts=${Date.now()}`, { headers: withAuth(token) }),
  getAdminDashboard: (token) =>
    request('/admin/dashboard', { headers: withAuth(token) }),
  adminLogin: (payload) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  createProduct: (token, payload) =>
    request('/products', {
      method: 'POST',
      headers: withAuth(token),
      body: JSON.stringify(payload),
    }),
  updateProduct: (token, id, payload) =>
    request(`/products/${id}`, {
      method: 'PUT',
      headers: withAuth(token),
      body: JSON.stringify(payload),
    }),
  deleteProduct: (token, id) =>
    request(`/products/${id}`, {
      method: 'DELETE',
      headers: withAuth(token),
    }),
  uploadProductImage: (token, file) => {
    const formData = new FormData()
    formData.append('image', file)
    return request('/upload/product-image', {
      method: 'POST',
      headers: withAuth(token),
      body: formData,
    })
  },
  createOrder: (payload) =>
    request('/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}
