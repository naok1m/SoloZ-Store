import { useState } from 'react'
import { products } from '../data/products'

const categoryLabels = {
  transformacoes: 'Transformações',
  vip: 'VIP',
  moedas: 'Moedas',
  kits: 'Kits',
}

function CategoryIcon({ category }) {
  if (category === 'transformacoes') {
    return (
      <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
  if (category === 'vip') {
    return (
      <svg className="w-4 h-4 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 16L3 6l5 3 4-5 4 5 5-3-2 10H5z" />
      </svg>
    )
  }
  if (category === 'moedas') {
    return (
      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.7 0-3 .9-3 2s1.3 2 3 2 3 .9 3 2-1.3 2-3 2m0-8V7m0 9v1m9-5a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
  if (category === 'kits') {
    return (
      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
      </svg>
    )
  }
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

// Modal visual de adição/edição de produto
function ProductModal({ onClose, onSave, product = null }) {
  const isEdit = !!product
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || '',
    badge: product?.badge || '',
    image: product?.image || '',
  })

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Para prototipo visual: gera URL temporaria para preview imediato.
    const localPreviewUrl = URL.createObjectURL(file)
    updateField('image', localPreviewUrl)
  }

  const handleSave = () => {
    onSave({
      ...product,
      ...formData,
      price: Number(formData.price) || 0,
      image: formData.image || null,
      badge: formData.badge || null,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-db-card border border-db-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
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

        <div className="space-y-3">
          <div>
            <label className="block text-gray-400 text-xs mb-1">Nome do produto</label>
            <input
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full bg-db-dark border border-db-border rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 transition-colors"
              placeholder="Ex: Super Saiyajin Blue"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs mb-1">Descrição</label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              className="w-full bg-db-dark border border-db-border rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 transition-colors h-20 resize-none"
              placeholder="Descreva o produto..."
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs mb-1">Imagem (URL)</label>
            <input
              value={formData.image}
              onChange={(e) => updateField('image', e.target.value)}
              className="w-full bg-db-dark border border-db-border rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 transition-colors"
              placeholder="https://site.com/produto.gif"
            />

            <div className="mt-2">
              <label className="inline-flex items-center justify-center px-3 py-2 border border-db-border rounded-lg text-sm text-gray-300 hover:text-white hover:border-gray-500 transition-colors cursor-pointer">
                Escolher imagem
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <p className="text-gray-600 text-xs mt-1">Aceita JPG, PNG, WEBP e GIF (upload local ou URL).</p>

            <div className="mt-2 h-20 rounded-xl border border-db-border bg-db-dark overflow-hidden flex items-center justify-center">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Pré-visualização"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-600">Pré-visualização da imagem</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-400 text-xs mb-1">Preço (R$)</label>
              <input
                value={formData.price}
                onChange={(e) => updateField('price', e.target.value)}
                type="number"
                step="0.01"
                className="w-full bg-db-dark border border-db-border rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 transition-colors"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Categoria</label>
              <select
                value={formData.category}
                onChange={(e) => updateField('category', e.target.value)}
                className="w-full bg-db-dark border border-db-border rounded-xl px-3 py-2.5 text-gray-300 text-sm focus:outline-none focus:border-yellow-500/50 transition-colors"
              >
                <option value="">Selecionar</option>
                <option value="transformacoes">Transformações</option>
                <option value="vip">VIP</option>
                <option value="moedas">Moedas</option>
                <option value="kits">Kits</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-xs mb-1">Badge (opcional)</label>
            <select
              value={formData.badge}
              onChange={(e) => updateField('badge', e.target.value)}
              className="w-full bg-db-dark border border-db-border rounded-xl px-3 py-2.5 text-gray-300 text-sm focus:outline-none focus:border-yellow-500/50 transition-colors"
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
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-db-border text-gray-400 rounded-xl hover:border-gray-500 hover:text-gray-300 transition-all text-sm font-semibold"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all text-sm"
          >
            {isEdit ? 'Salvar Alterações' : 'Adicionar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminTable() {
  const [catalog, setCatalog] = useState(products)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editProduct, setEditProduct] = useState(null)

  const syncMockData = (nextCatalog) => {
    products.splice(0, products.length, ...nextCatalog)
  }

  const handleCreateProduct = (newProduct) => {
    const nextId = catalog.length ? Math.max(...catalog.map((item) => item.id)) + 1 : 1
    const nextCatalog = [...catalog, { ...newProduct, id: nextId }]
    setCatalog(nextCatalog)
    syncMockData(nextCatalog)
  }

  const handleUpdateProduct = (updatedProduct) => {
    const nextCatalog = catalog.map((item) =>
      item.id === updatedProduct.id ? { ...item, ...updatedProduct } : item
    )
    setCatalog(nextCatalog)
    syncMockData(nextCatalog)
  }

  return (
    <div>
      {/* Cabeçalho da tabela */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-gaming text-lg font-bold text-white">Produtos</h2>
          <p className="text-gray-500 text-xs mt-0.5">{catalog.length} produtos cadastrados</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black px-4 py-2 rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all text-sm"
        >
          + Adicionar Produto
        </button>
      </div>

      {/* Tabela */}
      <div className="bg-db-card border border-db-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-db-border bg-db-dark/40">
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                  Produto
                </th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                  Categoria
                </th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                  Preço
                </th>
                <th className="text-left px-4 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-4 py-3 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {catalog.map((product, idx) => (
                <tr
                  key={product.id}
                  className={`hover:bg-white/5 transition-colors ${
                    idx < catalog.length - 1 ? 'border-b border-db-border/50' : ''
                  }`}
                >
                  {/* Produto */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border border-db-border rounded-lg overflow-hidden bg-db-dark flex items-center justify-center flex-shrink-0">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <CategoryIcon category={product.category} />
                        )}
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{product.name}</p>
                        <p className="text-gray-600 text-xs">#{product.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Categoria */}
                  <td className="px-4 py-3">
                    <span className="text-xs bg-db-dark border border-db-border px-2 py-1 rounded-lg text-gray-400">
                      {categoryLabels[product.category] || product.category}
                    </span>
                  </td>

                  {/* Preço */}
                  <td className="px-4 py-3">
                    <span className="text-yellow-400 font-black text-sm">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/30 px-2 py-1 rounded-lg font-semibold">
                      Ativo
                    </span>
                  </td>

                  {/* Ações */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditProduct(product)}
                        className="text-xs px-3 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-all"
                      >
                        Editar
                      </button>
                      <button className="text-xs px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-all">
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de adicionar produto */}
      {showAddModal && (
        <ProductModal
          onClose={() => setShowAddModal(false)}
          onSave={handleCreateProduct}
        />
      )}

      {/* Modal de editar produto */}
      {editProduct && (
        <ProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={handleUpdateProduct}
        />
      )}
    </div>
  )
}
