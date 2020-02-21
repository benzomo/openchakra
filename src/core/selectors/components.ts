import { RootState } from '../store'

// Components list selectors

export const getComponents = (state: RootState) =>
  state.components.present.components

export const getUserComponents = (state: RootState) => {
  const { userComponentIds, components } = state.components.present
  const userComponents = userComponentIds.map(name => components[name])

  return userComponents
}

// Component selectors

export const getProxyComponent = (id: string | IComponent['id']) => (
  state: RootState,
) => {
  const component = state.components.present.components[id]

  if (component.instanceOf) {
    const userComponent =
      state.components.present.components[component.instanceOf]
    component.props = { ...userComponent.props }
    component.children = userComponent.children

    return { ...component }
  }

  return component
}

export const getSelectedComponent = (state: RootState) => {
  return getProxyComponent(state.components.present.selectedId)(state)
}

// Other selectors

export const getSelectedComponentId = (state: RootState) =>
  state.components.present.selectedId

export const getIsSelectedComponent = (componentId: IComponent['id']) => (
  state: RootState,
) => state.components.present.selectedId === componentId

export const getSelectedComponentChildren = (state: RootState) => {
  return getSelectedComponent(state).children.map(child =>
    getProxyComponent(child)(state),
  )
}

export const getSelectedComponentParent = (state: RootState) =>
  state.components.present.components[getSelectedComponent(state).parent]

export const getHoveredId = (state: RootState) =>
  state.components.present.hoveredId

export const getIsHovered = (id: IComponent['id']) => (state: RootState) =>
  getHoveredId(state) === id
