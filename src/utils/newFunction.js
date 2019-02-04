const newFunction = (Component, mountNode, compiled, [...components], [...names]) => {
    new Function(
        'Component',
        'mountNode',
        ...names,
        compiled,
    )(
        Component,
        mountNode,
        ...components,
    );
};

export default newFunction;