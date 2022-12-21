export const videoMatGlow = new Material()
export const videoMatUmbrella = new Material()

// Glow
videoMatGlow.castShadows = false
videoMatGlow.metallic = 0
videoMatGlow.roughness = 1
videoMatGlow.emissiveIntensity = 3
videoMatGlow.emissiveColor = Color3.White()
videoMatGlow.alphaTest = 1

// mushroom umbrellas
videoMatUmbrella.castShadows = false
videoMatUmbrella.metallic = 1
videoMatUmbrella.specularIntensity = 1
videoMatUmbrella.roughness = 0.3
videoMatUmbrella.emissiveIntensity = 2
videoMatUmbrella.emissiveColor = Color3.White()
videoMatUmbrella.alphaTest = 0.1
videoMatUmbrella.alphaTexture = new Texture('images/umbrella_alpha.png')