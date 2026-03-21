import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useProducts } from '../context/ProductsContext'
import { api } from '../lib/api'

const categoryLabels = {
  transformacoes: 'Transformacoes',
  vip: 'VIP',
  moedas: 'Moedas',
  kits: 'Kits',
}

function CategoryIcon({ category }) {
  if (category === 'transformacoes') return <span className="text-sky-400">⚡</span>
  if (category === 'vip') return <span className="text-fuchsia-400">👑</span>
  if (category === 'moedas') return <span className="text-emerald-400">💰</span>
  if (category === 'kits') return <span className="text-cyan-400">🎒</span>
  return <span className="text-gray-400">📦</span>
}

function ProductModal({ onClose, onSave, onUploadImage, product = null, loading = false, submitError = '' }) {
  const isEdit = Boolean(product)
  const [formError, setFormError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [selectedFileName, setSelectedFileName] = useState('')
  const [formData, setFormData] = useState({
    legacyId: product?.legacyId || '',
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || '',
    badge: product?.badge || '',
    imageUrl: product?.imageUrl || '',
    minecraftCommand: product?.minecraftCommand || '',
    popular: Boolean(product?.popular),
    active: product?.active !== false,
  })

  const updateField = (field, value) => {
    if (formError) setFormError('')
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  useEffect(() => {
    if (submitError) {
      setFormError(submitError)
    }
  }, [submitError])

  const handleImageFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setFormError('')
    setSelectedFileName(file.name)
    setUploading(true)
    try {
      const response = await onUploadImage(file)
      updateField('imageUrl', response.imageUrl)
    } catch (err) {
      setFormError(err.message || 'Falha ao enviar imagem.')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  const handleSave = async () => {
    const normalizedPrice = Number(String(formData.price).replace(',', '.'))
    if (!Number.isFinite(normalizedPrice) || normalizedPrice < 0) {
      setFormError('Preco invalido. Use um valor maior ou igual a 0.')
      return
    }

    if (!formData.name.trim()) {
      setFormError('Nome do produto e obrigatorio.')
      return
    }

    try {
      await onSave({
        legacyId: formData.legacyId ? Number(formData.legacyId) : undefined,
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: normalizedPrice,
        category: formData.category || undefined,
        badge: formData.badge || null,
        imageUrl: formData.imageUrl || null,
        minecraftCommand: formData.minecraftCommand.trim(),
        popular: Boolean(formData.popular),
        active: Boolean(formData.active),
      })
    } catch (err) {
      setFormError(err?.message || 'Falha ao salvar produto.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-db-card border border-db-border rounded-2xl p-6 w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-gaming text-lg font-bold text-white">
            {isEdit ? 'Editar Produto' : 'Adicionar Produto'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-gray-400 text-xs mb-1">Legacy ID</label>
            <input
              value={formData.legacyId}
              onChange={(e) => updateField('legacyId', e.target.value)}
              className="w-full bg-db-dark border border-db-border rounded-xl px-3 py-2.5 text-white text-sm"
              placeholder="Ex: 11"
              disabled={loading || isEdit}
              type="number"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs mb-1">Preco (R$)</label>
            <input
              value={formData.price}
              onChange={(e) => updateField('price', e.target.value)}
              type="text"
              step="0.01"
              className="w-full bg-db-dark border border-db-border rounded-xl px-3 py-2.5 text-white text-sm"
              placeholder="0.00 ou 0,00"
              disabled={loading || uploading}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-400 text-xs mb-1">Nome</label>
            <input
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full bg-db-dark border border-db-border rounded-xl px-3 py-2.5 text-white text-sm"
              placeholder="Ex: Super Saiyajin Blue"
              disabled={loading || uploading}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-400 text-xs mb-1">Descricao</label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              className="w-full bg-db-dark border border-db-border rounded-xl px-3 py-2.5 text-white text-sm h-20 resize-none"
              placeholder="Descreva o produto..."
              disabled={loading || uploading}
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs mb-1">Categoria</label>
            <select
              value={formData.category}
              onChange={(e) => updateField('category', e.target.value)}
              className="w-full bg-db-dark border border-db-border rounded-xl px-3 py-2.5 text-gray-300 text-sm"
              disabled={loading || uploading}
            >
              <option value="">Selecionar</option>
              <option value="transformacoes">Transformacoes</option>
              <option value="vip">VIP</option>
              <option value="moedas">Moedas</option>
              <option value="kits">Kits</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-xs mb-1">Badge</label>
            <select
              value={formData.badge}
              onChange={(e) => updateField('badge', e.target.value)}
              className="w-full bg-db-dark border border-db-border rounded-xl px-3 py-2.5 text-gray-300 text-sm"
              disabled={loading || uploading}
            >
              <option value="">Nenhum</option>
              <option value="POPULAR">POPULAR</option>
              <option value="DESTAQUE">DESTAQUE</option>
              <option value="PREMIUM">PREMIUM</option>
              <option value="VIP">VIP</option>
              <option value="OFERTA">OFERTA</option>
              <option value="NOVO">NOVO</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-400 text-xs mb-1">Imagem (arquivo)</label>
            <input
              value={formData.imageUrl}
              className="w-full bg-db-dark border border-db-border rounded-xl px-3 py-2.5 text-white text-sm"
              placeholder="URL gerada automaticamente"
              disabled
              readOnly
            />
            <label className="mt-2 inline-flex items-center gap-2 text-xs text-sky-300 cursor-pointer hover:text-sky-200 transition-colors">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="hidden"
                onChange={handleImageFileChange}
                disabled={loading || uploading}
              />
              <span className="px-3 py-2 border border-db-border rounded-lg bg-db-dark">
                {uploading ? 'Enviando imagem...' : 'Selecionar arquivo'}
              </span>
              {selectedFileName && <span className="text-gray-500 truncate max-w-[220px]">{selectedFileName}</span>}
            </label>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-400 text-xs mb-1">Comando Minecraft</label>
            <input
              value={formData.minecraftCommand}
              onChange={(e) => updateField('minecraftCommand', e.target.value)}
              className="w-full bg-db-dark border border-db-border rounded-xl px-3 py-2.5 text-white text-sm"
              placeholder="lp user {player} parent add ssj"
              disabled={loading || uploading}
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={formData.popular}
              onChange={(e) => updateField('popular', e.target.checked)}
              disabled={loading || uploading}
            />
            Produto popular
          </label>

          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => updateField('active', e.target.checked)}
              disabled={loading || uploading}
            />
            Produto ativo
          </label>
        </div>

        {formError && (
          <p className="text-red-400 text-xs mt-3">{formError}</p>
        )}

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-db-border text-gray-400 rounded-xl hover:border-gray-500 hover:text-gray-300 transition-all text-sm font-semibold"
            disabled={loading || uploading}
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              void handleSave()
            }}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-sky-500 to-cyan-500 text-black font-black rounded-xl hover:from-sky-400 hover:to-cyan-400 transition-all text-sm disabled:opacity-60"
            disabled={loading || uploading}
          >
            {loading ? 'Salvando...' : uploading ? 'Aguardando upload...' : isEdit ? 'Salvar Alteracoes' : 'Adicionar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminTable() {
  const { token } = useAuth()
  const { refreshProducts } = useProducts()
  const [catalog, setCatalog] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editProduct, setEditProduct] = useState(null)

  const notifyProductsChanged = () => {
    localStorage.setItem('soloz_products_version', String(Date.now()))
  }

  const handleUploadImage = async (file) => {
    return api.uploadProductImage(token, file)
  }

  const loadCatalog = async () => {
    setLoading(true)
    setError('')
    try {
      const products = await api.listAdminProducts(token)
      setCatalog(products)
    } catch (err) {
      setError(err.message || 'Falha ao carregar produtos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCatalog()
  }, [token])

  const handleCreateProduct = async (payload) => {
    setSubmitting(true)
    setError('')
    try {
      await api.createProduct(token, payload)
      setShowAddModal(false)
      await loadCatalog()
      await refreshProducts()
      notifyProductsChanged()
    } catch (err) {
      setError(err.message || 'Falha ao criar produto.')
      throw err
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdateProduct = async (payload) => {
    if (!editProduct) return

    const changedPayload = Object.fromEntries(
      Object.entries(payload).filter(([key, value]) => {
        if (value === undefined) return false

        const currentValue = editProduct[key]

        if (typeof value === 'number' && typeof currentValue === 'number') {
          return Number(value) !== Number(currentValue)
        }

        return value !== currentValue
      })
    )

    if (Object.keys(changedPayload).length === 0) {
      setEditProduct(null)
      return
    }

    setSubmitting(true)
    setError('')
    try {
      await api.updateProduct(token, editProduct.id, changedPayload)
      setEditProduct(null)
      await loadCatalog()
      await refreshProducts()
      notifyProductsChanged()
    } catch (err) {
      setError(err.message || 'Falha ao atualizar produto.')
      throw err
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Tem certeza que deseja desativar este produto?')) return
    setError('')
    try {
      await api.deleteProduct(token, id)
      await loadCatalog()
      await refreshProducts()
      notifyProductsChanged()
    } catch (err) {
      setError(err.message || 'Falha ao desativar produto.')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-gaming text-lg font-bold text-white">Produtos</h2>
          <p className="text-gray-500 text-xs mt-0.5">{catalog.length} produtos cadastrados</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-500 text-black font-black px-4 py-2 rounded-xl hover:from-sky-400 hover:to-cyan-400 transition-all text-sm"
        >
          + Adicionar Produto
        </button>
      </div>

      {error && <p className="text-red-400 text-xs mb-4">{error}</p>}

      <div className="bg-db-card border border-db-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-db-border bg-db-dark/40">
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Produto</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Categoria</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Preco</th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500 text-sm">Carregando produtos...</td>
                </tr>
              )}
              {!loading && catalog.map((product, idx) => (
                <tr
                  key={product.id}
                  className={`hover:bg-white/5 transition-colors ${idx < catalog.length - 1 ? 'border-b border-db-border/50' : ''}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border border-db-border rounded-lg overflow-hidden bg-db-dark flex items-center justify-center flex-shrink-0">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <CategoryIcon category={product.category} />
                        )}
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{product.name}</p>
                        <p className="text-gray-600 text-xs">#{product.legacyId || product.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span className="text-xs bg-db-dark border border-db-border px-2 py-1 rounded-lg text-gray-400">
                      {categoryLabels[product.category] || product.category || 'Sem categoria'}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="text-sky-400 font-black text-sm">R$ {Number(product.price).toFixed(2)}</span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-lg font-semibold border ${
                        product.active
                          ? 'bg-green-500/10 text-green-400 border-green-500/30'
                          : 'bg-gray-500/10 text-gray-400 border-gray-500/30'
                      }`}
                    >
                      {product.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditProduct(product)}
                        className="text-xs px-3 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-all"
                      >
                        Editar
                      </button>
                      {product.active && (
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-xs px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-all"
                        >
                          Excluir
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <ProductModal
          onClose={() => setShowAddModal(false)}
          onSave={handleCreateProduct}
          onUploadImage={handleUploadImage}
          loading={submitting}
          submitError={error}
        />
      )}

      {editProduct && (
        <ProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={handleUpdateProduct}
          onUploadImage={handleUploadImage}
          loading={submitting}
          submitError={error}
        />
      )}
    </div>
  )
}
